const express = require("express");
const dotenv = require('dotenv').config();
const morgan = require("morgan");
const pathHandler = require("./middlewares/pathHandler.mid.js");
const errorHandler = require("./middlewares/errorHandler.mid.js");
const indexRouter = require("./routers/index.router.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//const sessionFileStore = require("session-file-store");
const MongoStore = require("connect-mongo");


const handlebars = require("express-handlebars");
const http = require("http");
const { Server } = require("socket.io");
const dbConnect = require("./utils/dbConnect.util.js");


// Inicializamos express
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const ready = () => {
  console.log("Server ready on port" + port);
  dbConnect()
}
app.listen(port, ready);

let msjs = [];
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
// Config de Cookies
app.use(cookieParser(process.env.SECRET_KEY));
// Config de Session con memory
//app.use(session({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }, }));
// Config de Session con file storage
//const FileStore = sessionFileStore(session);
//app.use(session({secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true, store: new FileStore({ path: "./src/data/fs/sessions", ttl: 10, retries: 2 })}));

// Config de Session con Mongo Storage
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: process.env.MONGO_LINK, ttl: 60*60*24 })
  }));


// routers
app.use(indexRouter);
app.use(errorHandler)
app.use(pathHandler)


// Public


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
// app.use("/home", homeRouter); VER


