const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, '../index.html')

const getGreeting = (req, res) => {
    res.setHeader("Content-Type", "text/html");
    fs.readFile(pathToFile, (err, data) => {
        if(err) throw err;
        res.status(200).send(data);
    })
}

module.exports = {
    getGreeting
}
