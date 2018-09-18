const mongoose = require('mongoose');
const Products = require('../../models/admin/products');
const path=require('path');

const sharp = require('sharp');

exports.product_add = (req, res, next) => {
    console.log(req.file);
    const IMAGE_SIZE=600;
    let getExtName=path.extname(req.file.originalname);
    let cropFIle=`${req.file.path}_${IMAGE_SIZE}${getExtName}`;
    sharp(req.file.path)
      .withMetadata()
      .resize(IMAGE_SIZE)
      .toFile(cropFIle, (err, info) => {
        if(err){
          console.log(err);
          return;
        }
        var products = new Products({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            image:req.file.filename,
            content: req.body.content,
            publishDate: req.body.publishDate
        });
        products.save().then(() => {
            res.status(200).json({
                code: 1,
                message: '操作成功'
            })
        }, (err) => {
            res.status(500).json({
                code: 0,
                message: '操作失败',
                error: err
            })
        });
      });



}
exports.product_get = function (req, res, next) {
    var perPage = 10
    var page = req.params.page || 1
    Products
        .find({})
        .skip((perPage * page) - perPage)
        .sort({
            'publishDate': 'desc'
        })
        .limit(perPage)
        .exec(function (err, data) {
            Products.count().exec(function (err, count) {
                if (err) return next(err)
                res.json({
                    code:1,
                    data: data,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
}
