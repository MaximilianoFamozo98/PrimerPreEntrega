const handlebars = require("express-handlebars");
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
// Importaciones de módulos locales
const {ProductManager} = require("./ProductManager.js");
const { CartManager } = require("./CartManager.js");
const { Product } = require("./Product.js");
const { productsRoutes } = require("./routes/products.routes.js");
const { cartsRouter } = require("./routes/carts.routes.js");
const routerUsers = require('./routes/users.route.js');

// Inicializamos express
const app = express();
const port = 8080;
const server = http.createServer(app);

let msjs = [];

// Public
app.use(express.static(__dirname + '/public'));

// Configuramos el motor de plantillas
app.engine("handlebars", handlebars.engine()); //motor de plantilla
app.set("views", __dirname + "/views"); // Indicamos dónde están las vistas
app.set("view engine", "handlebars"); // Indicamos el motor de plantilla que queremos usar

//Socket.io
const io = new Server(server)
io.on("connection", (socket) => {
  socket.emit("mensaje", "Hola cliente, bienvenido");

  //socket.on("mensaje2", (data) => {
  //  console.log(data)
  //})
  socket.on("messajenuevo", (data) => {
    console.log(data)
    msjs.push(data)
    io.sockets.emit("mensajesDelChat", msjs )
  })
})





//Prueba pagina handebars
app.use("/api", routerUsers);

// Configuramos las rutas
app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRouter);


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
