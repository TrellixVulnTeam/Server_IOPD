const Users = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const User = require('../models/User');
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')
const bcrypt=require('bcrypt');
const shortid = require('shortid');


class UserController {
    //[POST] /buyer/signup
    signup(req,res,next){
       
        User.findOne({email:req.body.email})    
        .exec( async (error,user)=>{
            if(user) return res.status(400).json({
                message:'User already registered'
            })
            const { firstName,lastName,email,password }=req.body;
            const hash_password = await bcrypt.hash(password, 10)
            const _user = new User({firstName,lastName,email,hash_password,userName:shortid.generate()})
            _user.save((error,data)=>{
                if(error){
                    return res.status(400).json({message:'Something went wrong'})
                }

                if(data){
                    return res.status(201).json({
                        message:'User created Successfully...!'
                    })
                }
            })
    })
    }
    //[POST] /buyer/signin
    signin(req,res,next)
    {
        User.findOne({email:req.body.email})
        .exec((error,user)=>{
            if(error) return res.status(400).json({error})
            if(user){
                if(user.authenticate(req.body.password)&& user.role === 'user'){
                    const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{ expiresIn:'1y'})
                    console.log(user._id)
                    const { firstName,lastName,email,role,fullName }=user;
                    res.status(200).json({
                        token,
                        user:{
                            firstName,lastName,email,role,fullName
                        }
                    })
                }
                else
                {
                    return res.status(400).json({
                        message:'Invalid Password'
                    })
                }
            }
            else{
                return res.status(400).json({message:'Something went wrong'})
            }
            
        })
        
    }


}

module.exports = new UserController();