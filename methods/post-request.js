// For generating unique ids
const crypto = require("crypto")
// Importing the body-parser
const requestBodyparser = require("../util/body-parser");
// Importing the writeto file
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res) => {
    if(req.url === "/api/movies") {
        try {
            // Getting the data that the user is sending to the server
            let body = await requestBodyparser(req)
            // console.log("Request Body: ", body);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            // Because it contains the complete movie set
            writeToFile(req.movies);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end();
        } catch(err){
            console.log(err);
            res.writeHead(400, {"Content-Type": "application/json"})
            res.end(
                JSON.stringify({
                    title: "Validation Failed",
                    message: "Request body is not valid",
                })
            )
        }
    }else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Route Not Found"}));
    }
};

// How we can create a new movie
// When we send data from the user to the server, we have to make use of something called body parser. In express we could have just installed the body parser. So we are going to buid something similar to the body parser in the util folder and then import it here