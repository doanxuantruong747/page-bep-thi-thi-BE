const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cartSchema = Schema(
    {
        productId: {
            type: Schema.Types.ObjectId, require: true,
            ref: "Product"
        },
        quantity: { type: Number, required: true },
        author: { type: String, require: true }
    },
    { timestamps: true }
);



const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;