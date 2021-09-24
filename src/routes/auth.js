const express=require('express');
const router=express.Router();
const AuthController=require('../app/controllers/AuthController')
const {validateSigninRequest,isRequestValidated}= require('../validator/auth');
const { requireSignin } = require('../middleware');





router.post('/signup',validateSigninRequest,isRequestValidated,AuthController.signup)
router.post('/signin',validateSigninRequest,isRequestValidated,AuthController.signin)  

router.post('/profile',requireSignin) 
router.get('/',(req,res,next)=>{
    return res.status(200).json({message:'connected'})
})  

module.exports=router