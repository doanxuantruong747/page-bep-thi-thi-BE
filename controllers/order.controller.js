const { sendResponse, AppError, catchAsync } = require("../helpers/untils");

const Order = require("../models/Order");

const orderController = {};

// function create new order
orderController.createNewOrder = catchAsync(async (req, res, next) => {


    //process
    let order = await Order.create(req.body)

    // response
    sendResponse(res, 200, true, order, null, "Create Order successful");
})


// function get list order
orderController.getOrder = catchAsync(async (req, res, next) => {


    let { page, limit, name, ...filterQuery } = req.query

    const filterKeys = Object.keys(filterQuery);
    if (filterKeys.length) {
        return res.status(401).json({ status: false, message: 'tên truy vấn sai' });
    }

    const filterConditions = [{ isDeleted: false }]
    if (customer) {
        filterConditions.push({
            customer: { $regex: customer, $options: "i" },
        })
    }
    const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

    const count = await Order.countDocuments(filterCritera)


    let orders = await Order.find(filterCritera)
        .sort({ createdAt: -1 })
        .populate({
            path: 'products',
            populate: { path: 'product' }
        })

    return sendResponse(res, 200, true, { orders, totalPages, count }, null, "Get Currenr Order successful")

})


// function get single product
orderController.getSingleOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.id;

    let order = await Order.findById(orderId)
        .sort({ createdAt: -1 })
        .populate({
            path: 'products',
            populate: { path: 'product' }
        })

    if (!order) {
        return sendResponse(res, 200, false, order, null, "Get Single Order Error")
    }

    return sendResponse(res, 200, true, order, null, "Get Single Order successful")
});


// function get update single
orderController.updateSingleOrder = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    let order = await Order.findById(id);

    if (!order) {
        return sendResponse(res, 200, false, { order: false }, null, "Update Order Error")
    }

    const allows = [
        "status",
        "products",

    ];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            order[field] = req.body[field]
        }
    });
    await order.save();
    return sendResponse(res, 200, true, order, null, "Update Order successful")
});


// function delete single product
orderController.deleteSingleOrder = catchAsync(async (req, res, next) => {

    const orderId = req.params.id;

    let order = await Order.findOneAndUpdate(
        { _id: orderId },
        { isDeleted: true },
        { new: true }
    )
    if (!order) {
        sendResponse(res, 200, false, { order: false }, null, "Delete Order successful")
    }

    return sendResponse(res, 200, true, order, null, "Delete Order successful")
});


module.exports = orderController