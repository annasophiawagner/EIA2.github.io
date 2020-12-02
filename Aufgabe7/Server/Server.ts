import * as http from "http";
import * as Url from "url";
import * as mongo from "mongodb";


const uri = "mongodb+srv://annasophia:FeqqerzpPcHEJT3k@database.bodha.mongodb.net/Hexenkessel?retryWrites=true&w=majority";
const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

let recipes: mongo.Collection;

client.connect(async err => {
    recipes = client.db("Hexenkessel").collection("recipes");
    console.log(await recipes.find().toArray());
});



let server = http.createServer();

let port: number | string | undefined = process.env.PORT;
if (port == undefined)
    port = 5001;

console.log("Server starting on port:" + port);

server.listen(port);
server.addListener("request", handleRequest);

async function handleRequest(_request: http.IncomingMessage, _response: http.ServerResponse): Promise<void> {
    console.log("What's up?");

    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) { 
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

        if (url.query["type"] == "put") {

        let recipe: any = JSON.parse(<string>url.query["recipe"]);
        recipes.insertOne(recipe);

        let jsonString: string = JSON.stringify(recipe);
        _response.write(jsonString);

    } else if (url.query["type"] == "get") {
        let AllRecipes = await recipes.find().toArray();
        _response.write(JSON.stringify(AllRecipes));
    }
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

