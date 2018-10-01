var jwt = require('jsonwebtoken');
var config=require('../config/auth')
var express = require('express');
var router = express.Router();
var app = express();
var auth=require('../router/authRoute');
var users = require('../controller/controller')
const { check, validationResult } = require('express-validator/check');
var usermod = require('../model/user');
var db = new usermod();
var response = {};
router.use('/auth', auth);  

router.get('/users/messageHistory',users.messageHistory); 

// app.use('/', router);
//module.exports = router;  
router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    db.email = req.body.email;
    // Hash the password using SHA1 algorithm.
    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    usermod.find({ "email": db.email, "password": db.password }, function (err, result) {
        console.log("result: " + result);
        var uname=result[0].firstname+' '+result[0].lastname;
        if (err) {
            response = {
                "Success": false,
                "message": "error fetching data"
            };
            return res.status(400).send(err);
        }
        else {
            var token=jwt.sign({id:db._id},config.secret,{
                expiresIn:86400
            })
            if (result.length > 0) {
                var response = {
                    "Success": true,
                    "message": "login successfully",
                    "token": token,
                    "userid":result[0]._id,
                    "username":uname
                };
                return res.status(200).send(response);
            }
            else {
                var response = {
                    "Success": false,
                    "message": "login Unsuccessful"
                };
                return res.status(401).send(response);
            }
        }
    });
})
router.post('/register', [
    check('firstname').isLength({ min: 3 }),
    check('lastname').isLength({ min: 3 }),
    check('mobile').isNumeric().isLength({ min: 10, max: 10 }),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var db = new usermod();
    db.firstname = req.body.firstname;
    db.lastname = req.body.lastname;
    db.mobile = req.body.mobile;
    db.email = req.body.email;
    // Hash the password using SHA1 algorithm.
    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    usermod.find({ "email": db.email }, function (err, data, ) {
        if (data.length > 0) {
            response = {
                "error": false,
                "message": "User Email id already exists ",
            }
            return res.status(404).send(response);
        }
        if (err) {
            response = {
                "error": true,
                "message": "There was a error fetching the data "
            }
            return res.status(404).send(response);
        }
        else {
            db.save(function (err) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "There was a error storing the data "
                    }
                }
                else {
                    response = { "error": false, "message": "User Has been successfully registered. Data has been successfully added to the database  " }
                }
                return res.status(202).send(response);
            });
        }
    });
})
app.use('/', router);
module.exports = router;