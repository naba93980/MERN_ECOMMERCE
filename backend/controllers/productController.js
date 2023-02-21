const productCollection = require('../models/ProductModel')
const { StatusCodes } = require('http-status-codes')
const { CreateCustomError } = require('../utils/customErrorHandler')
const asyncWrapper = require('../middleware/asyncWrapper')

const getAllProducts = asyncWrapper(async (req, res, next) => {
    const products = await productCollection.find()
    res.status(StatusCodes.OK).json({
        success: true,
        products
    })
})

const getOneProduct = asyncWrapper(async (req, res, next) => {
    const { id: productID } = req.params;
    const product = await productCollection.findById({ _id: productID });

    if (!product) {
        return next(CreateCustomError("Product not found", StatusCodes.INTERNAL_SERVER_ERROR))
    }

    res.status(StatusCodes.OK).json({
        success: true,
        product
    })
})

// create product - by admin
const createProduct = asyncWrapper(async (req, res, next) => {
    const product = await productCollection.create(req.body)
    res.status(StatusCodes.CREATED).json({
        success: true,
        product
    })
})

const updateProduct = asyncWrapper(async (req, res, next) => {
    const { id: productID } = req.params;
    const product = await productCollection.findOneAndUpdate(
        { _id: productID },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    if (!product) {
        return next(CreateCustomError("Product not found", StatusCodes.INTERNAL_SERVER_ERROR))
    }

    res.status(StatusCodes.OK).json({
        success: true,
        product
    })
})

const deleteProduct = asyncWrapper(async (req, res, next) => {
    const { id: productID } = req.params;
    const product = await productCollection.findOneAndDelete({ _id: productID })

    if (!product) {
        return next(CreateCustomError("Product not found", StatusCodes.INTERNAL_SERVER_ERROR))
    }

    res.status(StatusCodes.OK).json({
        success: true,
        product
    })
})

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getOneProduct
}