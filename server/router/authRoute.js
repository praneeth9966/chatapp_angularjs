var express=require('express');
var router=express.Router();
var users=require('../controller/controller');
var auth=require('../authentication/index');
router.get('/users/:id/list',auth,users.listOfUsers);
module.exports=router;
var auth=require('../authentication/index');