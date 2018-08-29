var mongoose=require('mongoose');

var productsSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    content:{
        type:String
    },
    publishDate: {
        type: Date,
        dafault: Date.now()
    }
});
module.exports = mongoose.model('Products_ad', productsSchema);
