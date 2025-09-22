/*config de io*/

const { Server } = require("socket.io");
const server = require("http").createServer(app); 

const io = new Server(server);

io.on("connection", async (socket) => {
  console.log(`usuarioID: ${socket.id} conectado`);

  socket.emit("update-products", await manager.getProducts());

  socket.on("delete-product", async (id) => {
    await manager.deleteProduct(id);
    io.emit("update-products", await manager.getProducts());
  });

 
  socket.on("add-product", async (newProduct) => {
    await manager.addProduct(newProduct);
    io.emit("update-products", await manager.getProducts());
  });
});

module.exports = server;
