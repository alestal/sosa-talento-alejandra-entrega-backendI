const express = require("express");
const app = express();
const PORT = 8080;
const fs = require("fs")

const ProductManager = require('./src/managers/ProductManager');
const CartManager = require('./src/managers/CartManager');

const productsRouter = require ("./src/routes/products.routes")
const cartsRouter = require ("./src/routes/carts.routes")

app.use(express.json());

app.use("/api/products", productsRouter)
app.use("/api/carts",cartsRouter)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

module.exports = app;