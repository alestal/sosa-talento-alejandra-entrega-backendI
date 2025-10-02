require("dotenv").config();
const path = require("path");
const express = require("express");
const config = require("./src/config/config"); 
const { paths, PORT } = require('./src/config/config');
const http = require("http");
const socketio = require("socket.io");
const handlebars = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");




const ProductManager = require("./src/managers/ProductManager");
const CartManager = require("./src/managers/CartManager");
const productscontroller = require("./src/controllers/products.controller");
const cartscontroller = require("./src/controllers/carts.controller");
const productsRouter = require ("./src/routes/products.routes")
const cartsRouter = require ("./src/routes/carts.routes");
const viewsRouter = require("./src/routes/views.routes");


const app = express();
const server = http.createServer(app);
const io = socketio(server);

/*MONGOOSE*/

mongoose
  .connect(config.database.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(" Conectado a MongoDB Atlas"))
  .catch((err) => console.error(" Error al conectar a MongoDB:", err));


/*MIDDLEWARE*/

app.use(logger("dev"));
//console.log('Servidor iniciado');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(paths.public));


/*HANDLEBAR*/
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "main",
  helpers: {
    eq: (a, b) => a === b,
    multiply: (a, b) => a * b,
  }
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", paths.views);



 /*rutas*/ 
 app.use("/", viewsRouter);
app.use("/api/products", productsRouter)
app.use("/api/carts",cartsRouter)



const productManager = new ProductManager(path.join(__dirname, "src/data/products.json"));



/*socket*/
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  /* Enviar lista de productos para el cliente*/
  const products = await productManager.getProducts();
  socket.emit("productList", products);
  
/*eliminar producto*/
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const updatedProducts = await productManager.getProducts();
    io.emit("productList", updatedProducts);
  });

  /*agregar producto*/
  socket.on("addProduct", async (newProduct) => {
    await productManager.addProduct(newProduct);
    const updatedProducts = await productManager.getProducts();
    io.emit("productList", updatedProducts);
  });
});

/*
app.listen(PORT, () => {
  console.log(` app listening on http://localhost:${PORT}`)
})*/

server.listen(PORT, () => {
  console.log(` Servidor en http://localhost:${PORT}`);
});



module.exports = app;