import http from "http";

const PORT = 3000;

import homePage from "./views/home/index.html.js";
import styles from "./content/styles/site.css.js";

http.createServer((req, res) => {
    if (req.url.includes("/styles/site.css")) {
        res.writeHead(200, { "content-type": "text/css" });
        res.write(styles);
        return res.end();
    }

    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    return res.end();
}).listen(PORT);
console.log(`Server listening on port: ${PORT}`);