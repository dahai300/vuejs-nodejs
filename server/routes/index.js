var express = require('express');
var router = express.Router();
var IndexController=require('../controllers/index')

router.get('/', function (req, res, next) {
    res.json({
        text:'hello world!!'
    })
});
//router.get('/product/page/:page',IndexController.product_get)
router.get('/recruit/page/:page',IndexController.recruit_get)
module.exports = router;
