const mongoose = require('mongoose');
const Cart = require("./models/cart.model")
const Product = require("./models/products.model");


    connect()
    const connect = () => {
        return mongoose.connect("mongodb+srv://famozomaximiliano:maxi43551684@proyect-myecommerce.ytfghuh.mongodb.net/ecommerce", (error) => {
          if (error) {
            console.log('Error al conectar con la base de datos:', + error);
            process.exit();          
          }
        } 
        , {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 60000, // Tiempo de espera de 30 segundos
          socketTimeoutMS: 45000,
        })
        .then(async () => {
          console.log('Base de datos conectada');
          // Tu lógica posterior a la conexión
          let cart1 = await Cart.find({_id: '664018f42be74a8543381194'});
          console.log(JSON.stringify(cart1, null, 3));
        })
        .catch((err) => {
          console.log('Error al conectar con la base de datos:', err);
        });
      };
      
      connect();
      
