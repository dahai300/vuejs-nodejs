const mongoose = require('mongoose');
const News = require('../../models/admin/news');

exports.news_add = (req, res, next) => {
    var news = new News({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        from:req.body.from,
        content: req.body.content,
        publishDate: req.body.publishdate,
    });
    news.save().then(() => {
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

exports.news_get = function (req, res, next) {
    var perPage = 10
    var page = req.params.page || 1
    News
        .find({})
        .skip((perPage * page) - perPage)
        .sort({
            'publishDate': 'desc'
        })
        .limit(perPage)
        .exec(function (err, data) {
            News.count().exec(function (err, count) {
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

exports.news_getById = (req, res, next) => {
    var id = req.params.id;
    News.findById(id)
        .exec()
        .then((data) => {
            if (data) {
                res.status(200).json({
                    code: 1,
                    message: '操作成功',
                    data: data
                });
            } else {
                res.status(404).json({
                    code: 0,
                    message: '操作失败'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                code: 0,
                message:'操作失败',
                error: err
            })
        });
}

exports.news_updateById = (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    var updateOps=req.body;
    console.log(updateOps)
    // var updateOps = {};
    // for (let ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    // console.log(updateOps);

    News.update({ _id: id }, { $set: updateOps })
        .exec()
        .then((data) => {
            res.status(200).json({
                code: 1,
                message: '操作成功'
            })
        })
        .catch((err) => {
            res.status(500).json({
                code: 0,
                message: '操作失败'
            })
        })
}

exports.news_deleteById = (req, res, next) => {
    var id = req.params.id;
    News.remove({ _id: id }, (err) => {
        if (err) throw err;
        res.status(200).json({
            code: 1,
            message: '操作成功'
        });
    })
}
