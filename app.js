const express = require("express");
const { paths} = require("./src/config/config");
const app = express();
const logger = require('morgan');

const handlebars = require ('express-handlebars');
const PORT = 8080;
const fs = require("fs");



/*MIDDLEWARE*/

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/uploads", express.static(paths.upload));
app.use("/static", express.static(path.public));  /*ver biene sto*/

/*HANDLEBAR*/
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", this.path.views);


const ProductManager = require("./src/managers/ProductManager");
const CartManager = require("./src/managers/CartManager");

const productsRouter = require ("./src/routes/products.routes")
const cartsRouter = require ("./src/routes/carts.routes");
const { extname } = require("path");
const { Server } = require("http");


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

/*STATIC*/

app.use(express.static(path.public));

/*socket io*/

module.exports = { io };


  

 /*path*/ 
app.use("/api/products", productsRouter)
app.use("/api/carts",cartsRouter)
app.use('/', viewsRouter);

socket.on('delete-product', async (id) => {
    await manager.deleteProduct(id);
    io.emit('update-products', await manager.getAll());
  });



app.listen(PORT, () => {
  console.log(` app listening on http://localhost:${PORT}`)
})






module.exports = app;