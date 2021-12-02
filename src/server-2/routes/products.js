const express = require("express");
const router = express.Router();

const {
    getProductById,
    getAllProducts,
    addProduct,
    editProduct,
    deleteProductById,
    deleteAllProducts
} = require("../controllers/products");

router.get("/:id", getProductById);
router.get("/", getAllProducts);

router.post("/", addProduct);

router.put("/:id", editProduct);

router.delete("/:id", deleteProductById);
router.delete("/", deleteAllProducts);

module.exports = router;