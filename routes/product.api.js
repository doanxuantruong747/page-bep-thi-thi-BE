const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();
//const { body, param } = require("express-validator");
//const validators = require("../middlewares/validators")
//const authentication = require("../middlewares/authentication");



/**
 * @route POST /products
 * @description Create a new products
 * @body {}
 * @access admin Login required
 */
router.post(
    "/",
    productController.createNewProduct
)


/**
 * @route GET /products?page=1&limit=10&name=`$title`
 * @description Get products with pagination, search by name
 * @access public
 */
router.get("/", productController.getProducts)



/**
 * @route GET /products/detail/:id
 * @description Get a product
 * @access public
 */
router.get("/detail/:id",
    productController.getSingleProduct)



/**
 * @route PUT /products
 * @description Update a new products
 * @body {}
 * @access 
 */
router.put("/:id",
    productController.updateSingleProduct)



/**
 * @route DELETE /products/:id
 * @description Delete a product
 * @access 
 */
router.delete("/:id"
    , productController.deleteSingleProduct
);


module.exports = router;