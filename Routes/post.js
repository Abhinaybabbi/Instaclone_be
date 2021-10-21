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

router.put("/:id",async function(req,res){
    const {title } = req.body;
    const post = await Post.findOne({ _id: req.params.id, user:req.user});
    if (!post){
        return res.status(404).json({
            status: "failed",
            message:"Post Not Found"
        })
    }
    if(String(post.user) !== req.user){
        return res.status(403).json({
            status: "failed",
            message:"Unauthorized user"
        })
        
    }
    await Post.updataOne({ _id: req.params.id},{
        title
    });
    res.json({
        status:"success"
    })

})

router.delete("/:id",async function(req,res){
    const {title } = req.body;
    const post = await Post.findOne({ _id: req.params.id, user:req.user});
    if (!post){
        return res.status(404).json({
            status: "failed",
            message:"Post Not Found"
        })
    }
    if(String(post.user) !== req.user){
        return res.status(403).json({
            status: "failed",
            message:"Unauthorized user"
        })
        
    }
    await Post.Delete({ _id: req.params.id});
    res.json({
        status:"success"
    })

})


module.exports=router;