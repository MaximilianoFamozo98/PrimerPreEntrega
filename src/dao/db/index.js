const mongoose = require('mongoose');
const Cart = require("./models/cart.model")
const Product = require("./models/products.model");


const connect = () => {
        return mongoose.connect("mongodb+srv://famozomaximiliano:maxi43551684@proyect-myecommerce.ytfghuh.mongodb.net/ecommerce")
        .then(async ()=> {
            console.log('Base de datos conectada')

            //Product.create({
            //    name: "Radio",
            //   price: 87,
            //    category: "Hogar",
            //    stock: 45
           // })

            //Cart.create({
            //    date: "15/02/2024",
           // })

        let cart1 = await Cart.find({_id: '664018f42be74a8543381194'})
         //cart1.products.push({product: "66401d1b5cb08011675cfe33"})
       //  console.log(cart1)

        // await Cart.updateOne({_id: "664018f42be74a8543381194"}, cart1)
         console.log(JSON.stringify(cart1, null, 3) )
         //console.log(JSON.stringify(cart1, null, '/t') ) // El profe lo usa asi, pero a mi me pone muchos /t
         



        }).catch((err)=> {
            console.log(err)
        })
    }   

    connect()
