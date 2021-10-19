const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login",async (req,res)=>{
    try{
        const { email,password } = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.json({
                status: "failed",
                message:"User not registered"
            });

        }

        const match = await bcrypt.compare(password, user.password);

        if (!match){
            return res.json({
                status:"failed",
                message:"Invalid password"
            });
        }
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60*60),
            data : user._id
        },`${process.env.JWT_SECRET_KEY}`);

        res.json({

            status:"Succes",
            Data:{
                token
            }
        });


    }
    catch(e){
        return res.json({
            status:"failed",
            message:e.message
        });


    }
});

router.post("/register",async (req,res)=>{
    try{
        const { name, email, password}= req.body;
        const hash = await bcrypt.hash(password,10);
        console.log(hash)
        await User.create({name,email,password:hash});
        res.json({

            status:"Succes",
            message:"Sign UP"
        
        });
    }
    catch(e){
        res.json({

            status:"failed",
            message:e.message
        
        });
    }



});

module.exports=router;