const express=require('express');
const router=express.Router();
const User=require('../../app/models/User');
const AdminAuthController=require('../../app/controllers/Admin/AuthController');
const { validationResult } = require('express-validator');
const {validateSigninRequest,isRequestValidated} = require('../../validator/auth');
const { requireSignin } = require('../../middleware');





//router.post('/signin',(req,res,next)=>{
//})

router.post('/signup',validateSigninRequest,isRequestValidated,AdminAuthController.signup)
router.post('/signin',validateSigninRequest,isRequestValidated,AdminAuthController.signin)
router.post('/signout',requireSignin,AdminAuthController.signout)
router.post('/profile',requireSignin)
 

module.exports=router;