const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/",async (req,res)=>{
    try{
        const posts= await Post.find();
        return res.json({
            status:"sucess",
            data:{
                posts
            }
        })
    }catch(e){
        res.json({
            status:"Failed",
            message: e.message
        })
    }
})
router.post("/",async (req,res)=> {
    const {title, body, image} = req.body;
    const post = await Post.create({
        title, body, image, user : req.user
    });
    res.json({
        status:"sucess",
        data:{
            post
        }

    })

});


module.exports=router;