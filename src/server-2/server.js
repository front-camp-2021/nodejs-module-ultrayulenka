const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const home = require("./routes/home");
const products = require("./routes/products");
const categories = require("./routes/categories");
const brands = require("./routes/brands");
const wishlist = require("./routes/wishlist");

const logUrl = require("./middlewares/logUrl");

const app = express();

const port = 3003; 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logUrl());

app.use("/", home);
app.use("/products", products);
app.use("/categories", categories);
app.use("/brands", brands);
app.use("/wishlist", wishlist);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});