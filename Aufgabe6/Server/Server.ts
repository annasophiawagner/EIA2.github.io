import * as http from "http";
import * as Url from "url";

let server = http.createServer();

let port: number | string | undefined = process.env.PORT;
if (port == undefined)
    port = 5001;

console.log("Server starting on port:" + port);

server.listen(port);
server.addListener("request", handleRequest);

function handleRequest(_request: http.IncomingMessage, _response: http.ServerResponse): void {
    console.log("What's up?");

    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

        let jsonObj: any = {};
        for (let key in url.query) {

            if (isJson(url.query[key])) {
                // @ts-ignore
                jsonObj[key] = JSON.parse(url.query[key])
            } else {
                jsonObj[key] = url.query[key]
            }
        }

        let jsonString: string = JSON.stringify(jsonObj);
        _response.write(jsonString);
    }

    _response.end();
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}