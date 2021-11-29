const fs = require("fs");
const path = require("path");

const pathToProducts = path.join(__dirname, '../db/products.json');

const getAllWishlist = (req, res) => {
    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        const wishlist = products.filter(({isInWishlist}) => isInWishlist);
        res.status(200).send(wishlist);
    })
}

const getProductInWishlist = (req, res) => {
    const { id } = req.params;

    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        const product = products.find(existingProduct => existingProduct.isInWishlist && existingProduct.id === id);
        if(product) {
            res.status(200).send(product);
        } else {
            res.status(404).send('Not found');
        }
    })
}

const addProductToWishlist = (req, res) => {
    const { id } = req.params;

    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        const index = products.findIndex(existingProduct => existingProduct.id === id);

        if(index < 0) {
            res.status(404).send('Not found');
            return;
        }

        products[index] = {...products[index], isInWishlist: true};

        fs.writeFile(pathToProducts, JSON.stringify(products), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `Product ${JSON.stringify(products[index])} was added to wishlist` });
        })
    })
}

const removeProductFromWishlist = (req, res) => {
    const { id } = req.params;

    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        const index = products.findIndex(existingProduct => existingProduct.id === id);

        if(index < 0) {
            res.status(404).send('Not found');
            return;
        }

        products[index] = {...products[index], isInWishlist: false};

        fs.writeFile(pathToProducts, JSON.stringify(products), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `Product ${JSON.stringify(products[index])} was removed from wishlist` });
        })
    })
}

const removeAllFromWishlist = (req, res) => {
    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        const newProducts = products.map(product => {
            return {
                ...product,
                isInWishlist: false
            }
        })

        fs.writeFile(pathToProducts, JSON.stringify(newProducts), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `All products were removed from wishlist` });
        })
    })
}

module.exports = {
    getAllWishlist,
    getProductInWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    removeAllFromWishlist
}