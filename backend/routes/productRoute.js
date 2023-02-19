const express = require('express')
const router=express.Router();
const {getAllProducts, createProduct, updateProduct, deleteProduct, getOneProduct} = require('../controllers/productController')

router.route('/products').get(getAllProducts)
router.post('/product/new',createProduct)
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getOneProduct)

module.exports=router