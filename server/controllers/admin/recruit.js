const mongoose = require('mongoose');
const Recruit = require('../../models/admin/recruit');
const RESCODE = require('../../config/rescode');

exports.recruit_add = (req, res, next) => {
    var recruit = new Recruit({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        desc: req.body.desc,
        meta:{
            createAt: req.body.createAt,
            updateAt: req.body.updateAt
        }
    });
    recruit.save().then(() => {
        res.status(200).json({
            code: 1,
            message: RESCODE.ADD_OK
        })
    }, (err) => {
        res.status(500).json({
            code: 0,
            message: RESCODE.HANDLE_FAILED,
            error: err
        })
    });
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

exports.recruit_getById = (req, res, next) => {
    var id = req.params.id;
    Recruit.findById(id)
        .exec()
        .then((data) => {
            if (data) {
                res.status(200).json({
                    code: 1,
                    message: RESCODE.GET_OK,
                    data: data
                });
            } else {
                res.status(404).json({
                    code: 0,
                    message: RESCODE.NODATA
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                code: 0,
                message: RESCODE.HANDLE_FAILED,
                error: err
            })
        });
}

exports.recruit_updateById = (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    var updateOps=req.body;
    console.log(updateOps)
    // var updateOps = {};
    // for (let ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    // console.log(updateOps);

    Recruit.update({ _id: id }, { $set: updateOps })
        .exec()
        .then((data) => {
            res.status(200).json({
                code: 1,
                message: RESCODE.UPDATE_OK
            })
        })
        .catch((err) => {
            res.status(500).json({
                code: 0,
                message: RESCODE.HANDLE_FAILED
            })
        })
}

exports.recruit_deleteById = (req, res, next) => {
    var id = req.params.id;
    Recruit.remove({ _id: id }, (err) => {
        if (err) throw err;
        res.status(200).json({
            code: 1,
            message: RESCODE.DELETE_OK
        });
    })
}
