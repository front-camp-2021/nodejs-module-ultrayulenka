const express = require("express");
const router = express.Router();

const {
    getAllBrands
} = require("../controllers/brands");

router.get("/", getAllBrands);

module.exports = router;