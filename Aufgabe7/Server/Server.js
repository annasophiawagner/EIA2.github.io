"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const Url = require("url");
const mongo = require("mongodb");
const uri = "mongodb+srv://annasophia:FeqqerzpPcHEJT3k@database.bodha.mongodb.net/Hexenkessel?retryWrites=true&w=majority";
const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let recipes;
client.connect(async (err) => {
    recipes = client.db("Hexenkessel").collection("recipes");
    console.log(await recipes.find().toArray());
});
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
        let recipe = JSON.parse(url.query["recipe"]);
        recipes.insertOne(recipe);
        let jsonString = JSON.stringify(recipe);
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