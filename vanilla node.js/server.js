import http from "http";

const PORT = 3000;

http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.write("Hello my man!");
    return res.end();
}).listen(PORT);
console.log(`Server listening on port: ${PORT}`);