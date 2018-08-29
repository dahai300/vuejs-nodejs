var mongoose=require('mongoose');

var newsSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true
    },
    from:{
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
module.exports = mongoose.model('News_ad', newsSchema);
