const express = require("express");
const app = express();
const port = 4201;
const fetch = require("node-fetch");
const fs = require('fs');
const cors = require('cors')
app.use(cors())

app.get("/", async(req, res) => {
    searchText = req.query.gif;
    const url =
        "https://api.giphy.com/v1/gifs/search?api_key=VPGJO7c5akpPvCG1pl6KbPO7Wrcb0Xg1&limit=1&q=" + searchText;
    gifInfo = null;
    // check if gif is in the file
    fs.readFile('./gifsDB.json', async function(err, data) {
        if (err) {
            throw err;
        }
        previuesGifs = JSON.parse(data)
            // if new gif
        if (!previuesGifs.hasOwnProperty(searchText)) {
            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    gifInfo = data
                })
                .catch(err => {
                    console.error("Error: ", err);
                });
            saveNewGif();
            res.send(gifInfo);
        } else {
            gifInfo = previuesGifs[searchText];
            res.send(gifInfo);
        }
    });
});

// saves new gif to json file
function saveNewGif() {
    previuesGifs[searchText] = gifInfo;
    jsonGifData = JSON.stringify(previuesGifs);
    fs.writeFile('gifsDB.json', jsonGifData, function(err, data) {});
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));