import http from "http";

const PORT = 3000;

import homePage from "./views/home/index.html.js";

http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    return res.end();
}).listen(PORT);
console.log(`Server listening on port: ${PORT}`);