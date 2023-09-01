const writeToFile = require("../util/write-to-file")

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );

    if(!regexV4.test(id)){
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Validation Failed", message: "UUID is not valid"}));
    } else if(baseUrl === "/api/movies/" && regexV4.test(id)){
        const index = req.movies.findIndex((movie) => {
            return movie.id === id;
        })

        if (index === -1){
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({title: "Not Found", message: "Movie Not Found"}));      
        } else {
            // Deleting the movie
            // Splice method changes contents of an array by removing or replacing existing elements and/or adding new elements in place
            req.movies.splice(index, 1);
            // Writing the updated movies to file
            writeToFile(req.movies);
            res.writeHead(204, {"Content-Type" : "application/json"});
            res.end(JSON.stringify(req.movies))
        }
    }else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Route Not Found"}));
    }
};

// How to delete a movie