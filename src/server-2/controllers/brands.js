const fs = require("fs");
const path = require("path");

const pathToBrands = path.join(__dirname, '../db/brands.json')

const getAllBrands = (req, res) => {
    fs.readFile(pathToBrands, 'utf-8', (err, data) => {
        if(err) throw err;
        res.status(200).send(JSON.parse(data))
    })
}

module.exports = {
    getAllBrands
}