const fs = require("fs");
const path = require("path");

const pathToCategories = path.join(__dirname, '../db/categories.json')

const getAllCategories = (req, res) => {
    fs.readFile(pathToCategories, 'utf-8', (err, data) => {
        if(err) throw err;
        res.status(200).send(JSON.parse(data))
    })
}

module.exports = {
    getAllCategories
}