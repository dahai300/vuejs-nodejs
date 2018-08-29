const mongoose = require('mongoose');
const Products = require('../../models/admin/products');

exports.product_upload= (req,res,next) => {
  if (!req.files)
     return;
  //console.log(req.files)
   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   let sampleFile = req.files.file;
   let fileName=sampleFile.name;
   // Use the mv() method to place the file somewhere on your server
   sampleFile.mv('public/uploads/'+fileName, function(err) {
     if (err){
       return res.status(500).json({
         code:0,
         error:err
       });
     }
     res.status(200).json({
         code: 1,
         message: '操作成功'
     });
   })
}

exports.product_add = (req, res, next) => {

     var products = new Products({
         _id: new mongoose.Types.ObjectId(),
         title: req.body.title,
         image:req.body.image,
         content: req.body.content,
         publishDate: req.body.publishdate,
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
