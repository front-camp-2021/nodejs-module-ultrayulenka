const express = require("express");
const router = express.Router();

const {
    getGreeting
} = require("../controllers/home");

router.get("/", getGreeting);

module.exports = router;