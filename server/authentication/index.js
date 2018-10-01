var jwt = require('jsonwebtoken');

var obj=require('../config/auth')
const secret=obj.secret;
var auth = function (req, res, next) {
    
    var token = req.headers["token"];
    var respo = {
        'message': "Unauthorised Entry "
    };
   
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
             console.log(err)
            return res.status(401).send(respo);
        }
        else {
            // console.log(decoded);
            next();
        }
    });
    
}
module.exports = auth;
