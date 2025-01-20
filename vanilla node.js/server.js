import http from "http";
import fs from "fs/promises";

const PORT = 3000;

import homePage from "./views/home/index.html.js";
import styles from "./content/styles/site.css.js";

http.createServer((req, res) => {
    function handleGetRequiest(contentType, file) {
        res.writeHead(200, { "content-type": contentType });
        res.write(file);
        return res.end();
    }

    if (req.url.includes("/styles/site.css")) return handleGetRequiest("text/css", styles);

    return handleGetRequiest("text/html", homePage);
}).listen(PORT);
console.log(`Server listening on port: ${PORT}`);