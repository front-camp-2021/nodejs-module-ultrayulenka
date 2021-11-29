const fs = require("fs");
const path = require("path");
const paginate = require("../services/paginate");
const filterProducts = require("../services/filterProducts");

const pathToProducts = path.join(__dirname, '../db/products.json')

const getAllProducts = (req, res) => {
    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const filteredProducts = filterProducts(JSON.parse(data), req);
        const paginateProducts = paginate(filteredProducts);
        res.status(200).send(paginateProducts(req,res))
    })
}

const getProductById = (req, res) => {
    const { id } = req.params;

    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        const product = products.find(existingProduct => {
            return existingProduct.id === id;
        });
        if(product) {
            res.status(200).send(product);
        } else {
            res.status(404).send('Not found');
        }
    })
}

const addProduct = (req, res) => {
    const { product } = req.body;
    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        products.push({...product, id: uuidv4()});
        fs.writeFile(pathToProducts, JSON.stringify(products), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `${JSON.stringify(product)} product was added` });
        })
    })
}

const editProduct = (req, res) => {
    const { id } = req.params;
    const { product } = req.body;

    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        const index = products.findIndex(existingProduct => existingProduct.id === id);

        if(index < 0) {
            res.status(404).send('Not found');
            return;
        }

        products[index] = {...product, id}

        fs.writeFile(pathToProducts, JSON.stringify(products), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `Product ${JSON.stringify(product)} was edited` });
        })
    })
}

const deleteProductById = (req, res) => {
    const { id } = req.params;

    fs.readFile(pathToProducts, 'utf-8', (err, data) => {
        if(err) throw err;
        let products = JSON.parse(data);
        newProducts = products.filter(existingProduct => {
            return existingProduct.id !== id;
        })

        if(products.length === newProducts.length) {
            res.status(404).send('Not found');
            return;
        }

        fs.writeFile(pathToProducts, JSON.stringify(newProducts), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `Product with id ${id} was deleted` });
        })
    })
}

const deleteAllProducts = (req, res) => {
    fs.writeFile(pathToProducts, JSON.stringify([]), (err) => {
        if(err) throw err;
        res.status(200).send({ response: `All products were deleted` });
    })
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProductById,
    deleteAllProducts
};