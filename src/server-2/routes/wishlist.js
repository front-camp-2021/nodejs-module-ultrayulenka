const express = require("express");
const router = express.Router();

const {
    getAllWishlist,
    getProductInWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    removeAllFromWishlist
} = require("../controllers/wishlist.js");

router.get("/", getAllWishlist);
router.get("/:id", getProductInWishlist);

router.post("/:id", addProductToWishlist);

router.delete("/", removeAllFromWishlist);
router.delete("/:id", removeProductFromWishlist);

module.exports = router;