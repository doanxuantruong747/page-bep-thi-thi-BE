const { sendResponse, AppError, catchAsync } = require("../helpers/untils")
const Product = require("../models/Product");

const productController = {};

// function create new product
productController.createNewProduct = catchAsync(async (req, res, next) => {

    const currentSellertId = req.userId;

    let { title,
        describe,
        price,
        priceSale,
        unit,
        image,
        rating,
        feedback,
        extraOptions, } = req.body

    let product = await Product.findOne({ title });
    if (product) {
        return sendResponse(
            res,
            200,
            false,
            { product, status: false },
            null,
            "This product name is already in the data")
    }

    product = await Product.create({
        title,
        describe,
        price,
        priceSale,
        unit,
        image,
        rating,
        feedback,
        extraOptions,
        author: currentSellertId
    })

    product = await product.populate("author");

    sendResponse(
        res,
        200,
        true,
        { product, status: true },
        null,
        "Create Product successful")

})

//function get list product
productController.getProducts = catchAsync(async (req, res, next) => {

    let { page, limit, name, ...filterQuery } = req.query

    const filterKeys = Object.keys(filterQuery);
    if (filterKeys.length)
        throw new AppError(400, "Not accepted query", "Bad Request");

    const filterConditions = [{ isDeleted: false }]
    if (name) {
        filterConditions.push({
            title: { $regex: title, $options: "i" },
        })
    }
    const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

    const count = await Product.countDocuments(filterCritera)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1)

    let products = await Product.find(filterCritera)
        .sort({ createdAt: -1 })
        .populate("author")
        .limit(limit)
        .skip(offset)

    return sendResponse(res, 200, true, { products, totalPages, count }, null, "Get Currenr Product successful")

})



//function get single product
productController.getSingleProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.id;

    let product = await Product.findById(productId).populate("author");

    if (!product) {
        return sendResponse(
            res,
            200,
            false,
            { product: false },
            null,
            "Get Single Product exits")
    }

    return sendResponse(
        res,
        200,
        true,
        product,
        null,
        "Get Single Product successful")
});


//function update single product
productController.updateSingleProduct = catchAsync(async (req, res, next) => {

    const productId = req.params.id;

    let product = await Product.findById(productId);

    if (!product) {
        return sendResponse(
            res, 200, false, { product: false }, null, "Update Product successful"
        )
    }

    const allows = [
        "title",
        "describe",
        "price",
        "priceSale",
        "unit",
        "image",
        "rating",
        "feedback",
        "extraOptions",
        "author"
    ];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            product[field] = req.body[field]
        }
    });
    await product.save();

    return sendResponse(res, 200, true, product, null, "Update Product successful")
});


// delete delete single product
productController.deleteSingleProduct = catchAsync(async (req, res, next) => {
    const currentSellerId = req.userId;
    const productId = req.params.id;

    let product = await Product.findOneAndUpdate(
        { _id: productId, author: currentSellerId },
        { isDeleted: true },
        { new: true }
    )
    if (!product) throw new AppError(400, "Post not found or Product not authorrized", "Deleta Product Error")

    return sendResponse(res, 200, true, product, null, "Delete Product successful")
});


module.exports = productController