const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const handlebars = require("express-handlebars");
const logger = require("morgan");
const { PORT, paths } = require("./src/config/config");


const ProductManager = require("./src/managers/ProductManager");
const CartManager = require("./src/managers/CartManager");
const productscontroller = require("./src/controllers/products.controller");
const cartscontroller = require("./src/controllers/carts.controller");
const productsRouter = require ("./src/routes/products.routes")
const cartsRouter = require ("./src/routes/carts.routes");
const viewsRouter = require("./src/routes/views.routes");
/*const { Server } = require("http"); comentado 14.26 revisar*/

const app = express();
const server = http.createServer(app);
const io = socketio(server);


/*MIDDLEWARE*/

app.use(logger("dev"));
//console.log('Servidor iniciado');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/uploads", express.static(paths.upload));


/*HANDLEBAR*/
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", paths.views);






/*MULTER
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, "uploads/");
      },

 filename: (req, file, cb)=> {
  const originalName = `img-${req.params.id}-${file.originalname}`;
  req.query.filename=originalName;
  cb(null,originalName); 
},     

});
const upload = multer({storage:storage});
*/
 

 /*rutas*/ 
app.use("/api/products", productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/", viewsRouter);

const productManager = new ProductManager(path.join(__dirname, "src/data/products.json"));


/*socket io*/
/*module.exports = {io};
socket.on('delete-product', async (id) => {
    await manager.deleteProduct(id);
    io.emit('update-products', await manager.getProducts());
  });*/

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("delete-product", async (id) => {
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    io.emit("update-products", products);
  });

});


app.listen(PORT, () => {
  console.log(` app listening on http://localhost:${PORT}`)
})






module.exports = app;