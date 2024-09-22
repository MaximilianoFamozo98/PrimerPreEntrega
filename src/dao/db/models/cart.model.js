const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    products: {
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                }
            }
        ],
    }
})

CartSchema.pre('find', function(){
    this.populate('products.product')
})

const Cart = mongoose.model('Cart', CartSchema);
module.exports =  Cart