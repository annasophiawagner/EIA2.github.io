"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const Url = require("url");
let server = http.createServer();
let port = process.env.PORT;
if (port == undefined)
    port = 5001;
console.log("Server starting on port:" + port);
server.listen(port);
server.addListener("request", handleRequest);
function handleRequest(_request, _response) {
    console.log("What's up?");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    if (_request.url) {
        let url = Url.parse(_request.url, true);
        let jsonObj = {};
        for (let key in url.query) {
            if (isJson(url.query[key])) {
                // @ts-ignore
                jsonObj[key] = JSON.parse(url.query[key]);
            }
            else {
                jsonObj[key] = url.query[key];
            }
        }
        let jsonString = JSON.stringify(jsonObj);
        _response.write(jsonString);
    }
    _response.end();
}
function isJson(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
//# sourceMappingURL=Server.js.map