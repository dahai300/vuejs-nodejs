const express = require('express');
const router = express.Router();
const multer = require('multer');
const path   = require('path');
const mongoose=require('mongoose');

const ProductsController = require('../../controllers/admin/products');

const checkauth=require('../../middleware/auth');

const fileFilter=(req,file,cb)=>{
  let allowTypes=["image/jpeg","image/png"];
  if(!allowTypes.includes(file.minetype)){
    console.log("type wrong")
    return cb(null,false);
  }

  cb(null,true);
}

//upload multer config
const storage=multer.diskStorage({
  destination:'./public/uploads',
  filename:function(req,file,cb){
    cb(null,new Date().getTime() +path.extname(file.originalname))
  },
  fileFilter:fileFilter,
  limits:{
    fileSize:1000000  //1000k
  }
});

const upload=multer({
  storage:storage
}).single('image');


//router.post('/uploadproduct',checkauth, ProductsController.product_upload);

router.post('/product',upload,ProductsController.product_add);
router.get('/product', checkauth,ProductsController.product_get);

module.exports = router;
