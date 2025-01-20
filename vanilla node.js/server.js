import http from "http";
import fs from "fs/promises";

const PORT = 3000;

import homePage from "./views/home/index.html.js";
import styles from "./content/styles/site.css.js";
import createCatPage from "./views/addCat.html.js";
import addBreedPage from "./views/addBreed.html.js";

async function readJsonData(file) {
    try {
        return await fs.readFile(`./data/${file}.json`, "utf8", (err, data) => {
            if (err) return console.error(err.message);
            return data
        });
    } catch (readJsonData) {
        console.log(`readJsonData: ${readJsonData}`);
    }
}

let cats = await readJsonData("cats");
cats = JSON.parse(cats);

let breeds = await readJsonData("breeds");
breeds = JSON.parse(breeds);

http.createServer((req, res) => {
    function handleGetRequiest(contentType, file) {
        res.writeHead(200, { "content-type": contentType });
        res.write(file);
        return res.end();
    }

    if (req.url.includes("/styles/site.css")) return handleGetRequiest("text/css", styles);
    if (req.url.includes("/add-cat")) return handleGetRequiest("text/html", createCatPage(breeds));
    if (req.url.includes("/add-breed")) return handleGetRequiest("text/html", addBreedPage);

    return handleGetRequiest("text/html", homePage(cats));
}).listen(PORT);
console.log(`Server listening on port: ${PORT}`);