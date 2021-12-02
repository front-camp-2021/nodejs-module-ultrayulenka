const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const {v4: uuidv4} = require("uuid");

const server = express();

const port = 3000;
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if(err) throw err;
        res.status(200).send(data);
    })
})

server.get('/products', (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    fs.readFile(__dirname + '/db.json', 'utf-8', (err, data) => {
        if(err) throw err;
        res.status(200).send(JSON.parse(data))
    })
})

server.get('/products/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader("Content-Type", "text/plain");
    fs.readFile(__dirname + '/db.json', 'utf-8', (err, data) => {
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
})

server.post('/products', (req, res) => {
    const { product } = req.body;
    fs.readFile(__dirname + '/db.json', 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        products.push({...product, id: uuidv4()});
        fs.writeFile(__dirname + '/db.json', JSON.stringify(products), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `${JSON.stringify(product)} product was added` });
        })
    })
})

server.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { product } = req.body;

    fs.readFile(__dirname + '/db.json', 'utf-8', (err, data) => {
        if(err) throw err;
        const products = JSON.parse(data);
        const index = products.findIndex(existingProduct => {
            return existingProduct.id === id
        });

        if(index < 0) {
            res.status(404).send('Not found');
            return;
        }

        products[index] = {...product, id}

        fs.writeFile(__dirname + '/db.json', JSON.stringify(products), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `Product ${JSON.stringify(product)} was edited` });
        })
    })
})

server.delete('/products', (req, res) => {
    fs.writeFile(__dirname + '/db.json', JSON.stringify([]), (err) => {
        if(err) throw err;
        res.status(200).send({ response: `All products were deleted` });
    })
})

server.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(__dirname + '/db.json', 'utf-8', (err, data) => {
        if(err) throw err;
        let products = JSON.parse(data);
        newProducts = products.filter(existingProduct => {
            return existingProduct.id !== id;
        })

        if(products.length === newProducts.length) {
            res.status(404).send('Not found');
            return;
        }

        fs.writeFile(__dirname + '/db.json', JSON.stringify(newProducts), (err) => {
            if(err) throw err;
            res.status(200).send({ response: `Product with id ${id} was deleted` });
        })
    })
})

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});