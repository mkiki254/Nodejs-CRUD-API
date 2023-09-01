// Importing the http module
const http = require("http");

// To use the port from the env file
require("dotenv").config();

// Importing all the four methods in the server.js
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");

// Importing the movies data
let movies = require("./data/movies.json");

// The port where the server will listen
const PORT = process.env.PORT || 5001;

// Creating a HTTP server
const server = http.createServer((req, res) => {
    req.movies = movies;

    switch(req.method) {
        case "GET": 
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({title: "Not Found", message: "Route Not Found"}));
            res.end();
    }
});

// We need to listen for this server on a port
server.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`)
})
