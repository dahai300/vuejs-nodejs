const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');

const ProductsController = require('../../controllers/admin/products');

const checkauth=require('../../middleware/auth');

router.post('/uploadproduct',checkauth, ProductsController.product_upload);
router.post('/product', checkauth,ProductsController.product_add);
router.get('/product', checkauth,ProductsController.product_get);

module.exports = router;
