const handlebars = require("express-handlebars");
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
// Importaciones de módulos locales
const {ProductManager} = require("./dao/fileSystem/ProductManager.js");
const { CartManager } = require("./dao/fileSystem/CartManager.js");
const { Product } = require("./dao/fileSystem/Product.js");
const { productsRoutes } = require("./routes/products.routes.js");
const { cartsRouter } = require("./routes/carts.routes.js");
const homeRouter = require('./routes/home.router.js');


const productsRoute = require("./routes/product.route.js");



// Inicializamos express
const app = express();
const port = 8080; 
const server = http.createServer(app);

let msjs = [];

// Public
app.use(express.static(__dirname +'/public'));

// Configuramos el motor de plantillas
app.engine("handlebars", handlebars.engine()); //motor de plantilla
app.set("views", __dirname + "/views"); // Indicamos dónde están las vistas
app.set("view engine", "handlebars"); // Indicamos el motor de plantilla que queremos usar

let arrMessage = [];
//Socket.io
const io = new Server(server)
io.on("connection", (socket) => {
  console.log("Hola nuevo cliente");
  socket.emit("wellcome", "Bievenido Cliente nuevo");

  socket.on("new-message", (data) => {
    arrMessage.push(data);
    io.sockets.emit("message-all", arrMessage);
    // Funcion que guarde los mensajes en la base de datos
  });
})


//Prueba pagina handebars chat coder
app.use("/home", homeRouter);

// Configuramos las rutas
app.use(express.json());
app.use ("/prod", productsRoute)  // Prueba con MongoDB
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRouter);         //REVISAR 


// Crear una instancia de ProductManager
const productManager = new ProductManager("products.txt");

server.listen(port, () => {
  console.log(`Server ok ${port}`);
});


//productos
const product1 = new Product(
  "producto prueba",
  "este es un producto prueba",
  1500,
  "sin imagen",
  "abc123",
  10
);

const product2 = new Product(
  "producto prueba2",
  "este es un producto prueba",
  22000,
  "sin imagen",
  "abc1234",
  2
);

const product3 = new Product(
  "producto prueba3",
  "este es un producto prueba",
  100,
  "sin imagen",
  "abc12347",
  25
);
const product4 = new Product(
  "producto prueba4",
  "producto prueba 4",
  10,
  "sin imagen",
  "abc1234722",
  5
);

const init = async () => {
  await productManager.addProduct(product1);
  await productManager.addProduct(product2);
  await productManager.addProduct(product3);
  await productManager.addProduct(product4);
};
init();
