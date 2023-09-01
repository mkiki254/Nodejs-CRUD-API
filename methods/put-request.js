// Importing the body-parser and write to file
const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res) => {
    // Since we need the UUID for updating the record
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );

    // Checking if the UUID is valid
    if(!regexV4.test(id)){
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Validation Failed", message: "UUID is not valid"}));
    } else if(baseUrl === "/api/movies/" && regexV4.test(id)){
        try {
            let body = await requestBodyparser(req);
            const index = req.movies.findIndex((movie) => {
                return movie.id === id;
            })
    
            if (index === -1){
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({title: "Not Found", message: "Movie Not Found"}));      
            }else {
                req.movies[index] = {id, ...body};
                writeToFile(req.movies);
                res.writeHead(200, {"Content-Type" : "application/json"});
                res.end(JSON.stringify(req.movies[index]));
            }
        } catch (err) {
            console.log(err);
            res.writeHead(400, {"Content-Type": "application/json"})
            res.end(
                JSON.stringify({
                    title: "Validation Failed",
                    message: "Request body is not valid",
                })
            )
        }
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Route Not Found"}));
    }
};