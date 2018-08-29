const User = require('../../models/admin/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const config=require('../../config');

var refreshTokens = {};

exports.user_list=(req,res,next)=>{
    User.find()
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
                    message: '暂无数据'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                code: 0,
                message: '操作失败',
                error: err
            })
        });
}

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 0,
                message: '操作失败'
            });
        }
        if (data.length > 0) {
            res.status(409).json({
                code: 0,
                message: '用户已存在！'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        code: 0,
                        message: '操作失败'
                    });
                }

                var user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });
                user.save().then(() => {
                    res.status(200).json({
                        code: 1,
                        message: '操作成功'
                    })
                }).catch((err) => {
                    console.log(err);
                })

            });
        }
    })

}

exports.user_signin = (req, res, next) => {
    var email=req.body.email;
    User.find({ email: email }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 0,
                message: '操作失败'
            })
        }
        if (data.length <= 0) {
            return res.status(401).json({
                code: 0,
                message: '验证失败，账号或密码错误'
            })
        }
        bcrypt.compare(req.body.password, data[0].password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    code: 0,
                    message: '验证失败'
                })
            }
            if (result) {
                var payload = {
                    email: email,
                    role:'dahai'
                };
                let token = jwt.sign(payload, config.secret, {
                    expiresIn: 1800
                });
                var refreshToken = randtoken.uid(256);
                console.log("refreshToken: "+refreshToken);
                refreshTokens[refreshToken] = email;
                return res.status(200).json({
                    code: 1,
                    message: '验证通过',
                    token: token,
                    refreshToken:refreshToken
                });
            } else {
                return res.status(401).json({
                    code: 0,
                    message: '验证失败'
                })
            }
        })
    })
}

exports.post_token=(req,res,next)=>{
  var email = req.body.email;
  var refreshToken = req.body.refreshToken;
  if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == email)) {
    var user = {
      'email': email,
      'role': 'dahai'
    }
    var token = jwt.sign(user, config.secret, { expiresIn: 3600 })
    res.json({token: token})
  }
  else {
    res.send(401)
  }
}
