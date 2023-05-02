const express = require('express')
const productRouter = express.Router()


const { getProduct, getProductByID } = require('../controllers/productController')



productRouter.get('/', getProduct);

productRouter.get('/:id', getProductByID);



module.exports = productRouter;