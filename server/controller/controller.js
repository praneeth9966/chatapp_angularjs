var jwt = require('jsonwebtoken');
const secret = "abcdefghijkl999663";
function encrypt(pass) {
    require('crypto')
        .createHash('sha1')
        .update(pass)
        .digest('base64');
}
exports.login = function (req, res) {
    const { check } = require('express-validator/check')
    var usermod = require('../model/user');
    var db = new usermod();
    var response = {};
    var mail = req.body.email;
    check(mail).isEmail();
    var password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    usermod.find({ email: mail, password: password }, function (err, res) {

        if (err) {
            response = {
                "Success": false,
                "message": "error fetching data"
            };
            return res.status(400).send(err);
        }
        else {
            if (res.length > 0) {
                var token = jwt.sign({ email: mail, password: password }, secret, {
                    expiresIn: 60 * 60 * 2
                });

                console.log(res);
                var response = {
                    "Success": true,
                    "message": "login successful",
                    "token": token,
                    'user': res

                };
                return res.status(200).send(response);
            }
            else {
                var response = {
                    "Success": true,
                    "message": "invalid"
                };
                return res.status(401).send(response);
            }
        }
    });

}
exports.registration = function (req, res) {
    const { check } = require('express-validator/check')
    var usermod = require('../model/user');
    var db = new usermod();
    var response = {};
    db.firstname = req.body.firstname;
    db.lastname = req.body.lastname;
    db.mobile = req.body.mobile;
    db.email = req.body.email;
    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    var mail = req.body.email;
    check(mail).isEmail();
    usermod.find({
        "email": mail

    }, function (err, data) {
        if (err) {
            response = {
                "Success": false,
                "message": "Error fetching data"
            };
            return res.status(404).send(response);
        } else {
            if (data.length > 0) {
                var response = {
                    "Success": false,
                    "message": "Credentials already Exist!!",
                };
                return res.status(404).send(response);
            } else {
                db.save(function (err) {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    if (err) {
                        response = {
                            "Success": false,
                            "message": "Error adding data",
                            "err": err
                        };
                    } else {
                        response = {
                            "Success": true,
                            "message": "Successfully Registed"
                        };
                    }
                    return res.status(200).send(response);
                });
            }
        }
    })
}

//**************************************************************** */

exports.listOfUsers = function (req, res) {
    var userModel = require('../model/user');
    var response = {};
    var arrList = [];
    var userid = req.params.id;
    userModel.find({ "_id": { $ne: userid } }, function (err, data) {
        // console.log(data);
        for (key in data) {
            arrList.push({
                name:data[key].firstname+' '+data[key].lastname,
                email: data[key].email,
                userid: data[key]._id
            });
        }
        if (err) {
            response = {
                "error": true,
                "message": "error retrieving data"
            }
        }
        else {
            response = {
                "error": false,
                "message": arrList
            }
        }
        return res.status(200).send(response);
    })
}

//***************************************************************** */
exports.addMessages=function(message, date, username){
    var msgMod=require('../model/message');
    
    var mdb=new msgMod();
    var response={};

    mdb.message= message;
    // mdb.from=req.body.from;
    //var to=req.body.to;
    mdb.date=date;
    mdb.username=username;
    console.log(username);

    mdb.save(function (err) {
        
        if (err) {
            response = {
                "Success": false,
                "message": "Error adding data",
                "err": err
            };
        } else {
            response = {
                "Success": true,
                "message": "Successfully Sent"
            };
        }
        console.log(response);
        
    });


}
exports.messageHistory= function(req,res)
{
    var msgMod=require('../model/message');
    
    var response={};
    
    msgMod.find({}, function(err,result){
        if (err) {
            response = {
                "Success": false,
                "message": "Error fetching data"
            };
            return res.status(404).send(err);
        } else {
            response={
                "Success": true,
                "message": result
            }
            
        }
            return res.status(200).send(response);
    })
}
