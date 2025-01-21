import http from "http";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";

const PORT = 3000;

import homePage from "./views/home/index.html.js";
import styles from "./content/styles/site.css.js";
import createCatPage from "./views/addCat.html.js";
import addBreedPage from "./views/addBreed.html.js";
import newHome from "./views/catShelter.html.js";
import editPage from "./views/editCat.html.js";

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

let filtered = [];

http.createServer((req, res) => {
    function handleGetRequiest(contentType, file) {
        res.writeHead(200, { "content-type": contentType });
        res.write(file);
        return res.end();
    }

    if (req.url.includes("/styles/site.css")) return handleGetRequiest("text/css", styles);

    if (req.method === "POST") {
        if (req.url.includes("/add-cat")) {
            req.on("data", async data => {
                let params = Object.fromEntries(new URLSearchParams(data.toString()));

                console.log(params);                
            });
        }

        res.writeHead(302, { "location": "/" });
        return res.end();
    }

    if (req.url.includes("/add-cat")) return handleGetRequiest("text/html", createCatPage(breeds));
    if (req.url.includes("/add-breed")) return handleGetRequiest("text/html", addBreedPage);
    if (req.url.includes("/new-home")) {
        const id = req.url.split("/")[2];
        const cat = cats.find(c => c.id === id);
        if (cat) return handleGetRequiest("text/html", newHome(cat));
    }
    if (req.url.includes("/change-info")) {
        const id = req.url.split("/")[2];
        const cat = cats.find(c => c.id === id);
        return handleGetRequiest("text/html", editPage(cat, breeds));
    }
    if (req.url.includes("/search")) return handleGetRequiest("text/html", searchPage(filtered));

    return handleGetRequiest("text/html", homePage(cats));
}).listen(PORT);
console.log(`Server listening on port: ${PORT}`);