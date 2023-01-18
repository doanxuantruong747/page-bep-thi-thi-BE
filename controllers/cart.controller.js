const { sendResponse, AppError, catchAsync } = require("../helpers/untils");
const Cart = require("../models/Cart");

const cartController = {};

// add product in cart
cartController.createCart = catchAsync(async (req, res, next) => {

    let { productId } = req.body;

    let cart = await Cart.findOne({ productId, author })

    if (cart) {
        cart.quantity += quantity;
        await cart.save()
        return sendResponse(
            res,
            200,
            true,
            cart,
            null,
            "Create Cart successful")
    }

    cart = await Cart.create(req.body)
    sendResponse(
        res,
        200,
        true,
        cart,
        null,
        "Create Cart successful")

})


// get list carts
cartController.getCart = catchAsync(async (req, res, next) => {


    let carts = await Cart.find()
        .sort({ createdAt: -1 })

    let totalQuantity = 0;
    if (carts.length) {
        carts.forEach((item) => { totalQuantity += item.quantity })
    }

    return sendResponse(res, 200, true, { carts, totalQuantity }, null, "Get Currenr Cart successful")

})

//update single cart
cartController.updateSingleCart = catchAsync(async (req, res, next) => {

    const cartId = req.params.id;
    let cart = await Cart.findById(cartId);
    if (!cart) throw new AppError(400, "Cart not found", "Update Cart Error")

    const allows = [
        "quantity",
    ];

    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            cart[field] = req.body[field]
        }
    });
    await cart.save();

    return sendResponse(res, 200, true, cart, null, "Update Cart successful")
});


//delete single product in cart
cartController.deleteCart = catchAsync(async (req, res, next) => {

    const cartId = req.params.id;

    let cart = await Cart.findOneAndRemove(
        { _id: cartId },
        { new: true }
    )
    if (!cart) throw new AppError(400, "Post not found or Cart not authorrized", "Deleta Cart Error")

    return sendResponse(res, 200, true, cart, null, "Delete Cart successful")

});


module.exports = cartController


