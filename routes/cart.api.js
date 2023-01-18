const express = require("express");
const cartController = require("../controllers/cart.controller");
const router = express.Router();



/**
 * @route POST /cart
 * @description Create a new cart
 * @body {productId:Types.ObjectId, authorUser:Types.ObjectId,amount}
 * @access Seller Login required
 */
router.post(
    "/",
    cartController.createCart
)

/**
 * @route GET /cart?page=1&limit=10&name=`$productName`
 * @description Get cart with pagination
 * @access public
 */
router.get("/",
    cartController.getCart)



/**
 * @route PUT /cart
 * @description Update a new cart
 * @body {amount}
 * @access Seller Login required
 */
router.put("/:id",
    cartController.updateSingleCart)



/**
 * @route DELETE /cart/:id
 * @description Delete a cartProduct
 * @access Login required
 */
router.delete("/:id"
    , cartController.deleteCart
);


module.exports = router;