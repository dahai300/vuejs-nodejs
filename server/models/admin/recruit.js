var mongoose=require('mongoose');

var recruitSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    meta: {
        createAt: {
            type: Date,
            dafault: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports = mongoose.model('Recruit_ad', recruitSchema);