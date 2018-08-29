const jwt=require('jsonwebtoken');
const config=require('../config');

module.exports=(req,res,next)=>{
    var getHeaders=req.headers.authorization;
    var token;
    if(getHeaders){
      token = getHeaders.split(" ")[1];
    }
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
              console.log(err)
              return res.status(401).json({ success: false, message: 'Failed to authenticate token'});
            } else {
                req.decoded = decoded;
                req.token = token;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
