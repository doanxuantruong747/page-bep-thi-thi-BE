const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators")
const authentication = require("../middlewares/authentication");


/**
 * @route POST /oders
 * @description Create a new Oders
 * @body {}
 * @access 
 */
router.post("/",
    orderController.createNewOrder
)


/**
 * @route GET /oders?page=1&limit=10
 * @description Get Oders with pagination
 * @access public
 */
router.get("/",
    orderController.getOrder)


/**
 * @route GET /oders/:id
 * @description Get a Oders
 * @access public
 */
router.get("/:id",
    orderController.getSingleOrder)


/**
 * @route PUT /oders
 * @description Update a new oders
 * @body {}
 * @access 
 */
router.put("/:id",
    orderController.updateSingleOrder)


/**
 * @route DELETE /oders/:id
 * @description Delete a oder
 * @access 
 */
router.delete("/:id",
    orderController.deleteSingleOrder
);



module.exports = router;