const Product = require('../models/admin/product');
const Recruit=require('../models/admin/recruit');

exports.product_get = function (req, res, next) {
    var perPage = 4
    var page = req.params.page || 1

    Product
        .find({})
        .skip((perPage * page) - perPage)
        .sort({
            'meta.updateAt': 'desc'
        })
        .limit(perPage)
        .exec(function (err, products) {
            Product.count().exec(function (err, count) {
                if (err) return next(err)
                res.json({
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
}

exports.recruit_get = function (req, res, next) {
    var perPage = 10
    var page = req.params.page || 1

    Recruit
        .find({})
        .skip((perPage * page) - perPage)
        .sort({
            'meta.updateAt': 'desc'
        })
        .limit(perPage)
        .exec(function (err, products) {
            Recruit.count().exec(function (err, count) {
                if (err) return next(err)
                res.json({
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
}
