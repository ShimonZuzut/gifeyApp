 let APIKEY = "VPGJO7c5akpPvCG1pl6KbPO7Wrcb0Xg1";
 document.addEventListener("DOMContentLoaded", init);

 function init() {
     document.getElementById("btnSearch").addEventListener("click", ev => {
         ev.preventDefault(); //to stop the page reload
         let url = `http://localhost:4201/?gif=`; //URL without q
         let str = document.getElementById("search").value.trim(); // user input

         url = url.concat(str); //full query
         fetch(url)
             .then(response => response.json()) // getting out the data from the json file
             .then(content => {
                 for (var i = 0; i <= content.data.length; i++) {
                     let fig = document.createElement("figure");
                     let img = document.getElementById("currentGif");
                     let fc = document.createElement("figcaption");
                     img.src = content.data[i].images.fixed_height.url;
                     img.alt = content.data[i].title;
                     fc.textContent = content.data[i].title;
                     fig.appendChild(img);
                     let out = document.querySelector(".gifs");
                     out.insertAdjacentElement("afterbegin", fig);
                     document.querySelector("#search").value = "";

                 }


             })
             .catch(err => {
                 console.error(err);
             });

     });
 }