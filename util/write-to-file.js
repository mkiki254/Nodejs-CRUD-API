// Importing file system and path
const fs = require("fs");
const path = require("path")

module.exports = (data) => {
    // console.log("The data to write in file: ", data);
    try {
        fs.writeFileSync(
            path.join(
                __dirname, //Gives the route directory of the project
                "..",  // Going one level up the folder structure
                "data", // Going to the data directory
                "movies.json"), // The file that is acting as our database
                JSON.stringify(data), // Since the data is in a javascript object, it needs to be converted into a string
                "utf-8" // Character encoding
            );
    }catch (err){
        console.log(err);
    }
}