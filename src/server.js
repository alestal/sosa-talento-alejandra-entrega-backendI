const { Server } = require("socket.io");
const server = require("http").createServer(app); 
const ProductService = require("./services/products.services");
const io = new Server(server);

const ProductManager = require('../managers/ProductManager');
const path = require("path");
const manager = new ProductManager(path.join(__dirname, "../data/products.json"));

io.on("connection", async (socket) => {
  console.log(`usuarioID: ${socket.id} conectado`);

  /* productos actuales*/
  socket.emit("productList", await manager.getProducts()); 

  /* elimina un producto*/
  socket.on("deleteProduct", async (id) => {               
    await manager.deleteProduct(id);
    io.emit("productList", await manager.getProducts());   
  });

  /* agrega un producto*/
  socket.on("addProduct", async (newProduct) => {          
    await manager.addProduct(newProduct);
    io.emit("productList", await manager.getProducts());  
  });
});

module.exports = server;
