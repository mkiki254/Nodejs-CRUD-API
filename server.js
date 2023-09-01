// Importing the http module
const http = require("http");

// To use the port from the env file
require("dotenv").config();

// The port where the server will listen
const PORT = process.env.PORT || 5001;

// Creating a HTTP server
const server = http.createServer((req, res) => {
    // Throwing a simple response
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({message: "Hello Charles, How is Nodejs API Project"}));
    res.end();
    // When you search: localhost:5000 on the browser, you see the above message
    // It is a get request
});

// We need to listen for this server on a port
server.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`)
})