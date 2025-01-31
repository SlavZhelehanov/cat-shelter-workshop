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
import searchPage from "./views/search.html.js";

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

async function writeJsonData(file, arr) {
    try {
        return await fs.writeFile(`./data/${file}.json`, JSON.stringify(arr, null, 2));
    } catch (writeJsonDataErr) {
        return console.log(`writeJsonDataErr: ${writeJsonDataErr}`);
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

                if (0 < params.name.length && 0 < params.description.length && 0 < params.image.length && 0 < params.price.length && 0 < params.breed.length) {
                    cats.push({ id: uuid(), ...params, price: +params.price });
                    await writeJsonData("cats", cats);
                }
            });
        } else if (req.url.includes("/add-breed")) {
            req.on("data", async data => {
                let params = Object.fromEntries(new URLSearchParams(data.toString())).breed;

                if (0 < params.length) {
                    breeds.push(params);
                    await writeJsonData("breeds", breeds);
                }
            });
        } else if (req.url.includes("/change-info")) {
            const id = req.url.split("/")[2];

            if (cats.some(cat => cat.id === id)) {
                req.on("data", async data => {
                    let params = Object.fromEntries(new URLSearchParams(data.toString()));

                    if (0 < params.name.length && 0 < params.description.length && 0 < params.image.length && 0 < params.price.length && 0 < params.breed.length) {
                        for (let i = 0; i < cats.length; i++) {
                            if (cats[i].id === id) {
                                cats[i] = { id, ...params, price: +params.price };
                                break;
                            }
                        }
                        await writeJsonData("cats", cats);
                    }
                });
            }
        } else if (req.url.includes("/new-home")) {
            const id = req.url.split("/")[2];

            if (cats.some(cat => cat.id === id)) {
                cats = cats.filter(f => f.id != id);

                req.on("data", async data => {
                    console.log(data);
                    await writeJsonData("cats", cats);
                });
            }
        } else if (req.url.includes("/search")) {
            req.on("data", async data => {
                let params = Object.fromEntries(new URLSearchParams(data.toString())).search.toLowerCase();
                filtered = cats.filter(f => f.breed.toLowerCase().includes(params));
            });
        }

        if (req.url.includes("/search")) {
            res.writeHead(302, { "location": "/search" });
        } else {
            res.writeHead(302, { "location": "/" });
        }
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