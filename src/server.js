/*config de io*/

const io = newServer(server);




io.on("conection",(socket) => {
    console.log(`usuarioID:${socket.id}Conectado`);
});


  socket.emit('update-products', await manager.getProducts());
  socket.on('delete-product', async (id) => {
 
    await manager.deleteProduct(id);
    io.emit('update-products', await manager.getProducts());
  });


module.exports = server;
