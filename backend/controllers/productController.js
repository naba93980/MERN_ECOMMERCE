const productCollection = require('../models/ProductModel')
const { StatusCodes } = require('http-status-codes')


const getAllProducts = async (req, res, next) => {
    const products = await productCollection.find()
    res.status(StatusCodes.OK).json({
        success: true,
        products
    })
}

const getOneProduct = async (req, res, next)=>{
    const { id: productID } = req.params;
    const product = await productCollection.findById({_id: productID});
    if (!product) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Product not found"
        })
    }

    res.status(StatusCodes.OK).json({
        success: true,
        product
    })
}

// create product - by admin
const createProduct = async (req, res, next) => {
    const product = await productCollection.create(req.body)
    res.status(StatusCodes.CREATED).json({
        success: true,
        product
    })
}

const updateProduct = async (req, res, next) => {
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Product not found"
        })
    }
    res.status(StatusCodes.OK).json({
        success: true,
        product
    })
}

const deleteProduct = async (req, res, next) => {
    const { id: productID } = req.params;
    const product = await productCollection.findOneAndDelete({ _id: productID })

    if (!product) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Product not found"
        })
    }

    res.status(StatusCodes.OK).json({
        success: true,
        product
    })
}
module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getOneProduct
}