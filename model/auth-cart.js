const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userEmail:{
        type:String,
    },
    products:{
        // product_id:{
        //     type:Number,
        //     required:true,
        // },
        // product_quantity:{
        //     type: Number,
        //     required:true,
        // },
        type: Object,
        required: true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
})

const Cart = new mongoose.model("CART", cartSchema);
module.exports = Cart;