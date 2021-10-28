const { json } = require("body-parser");
const express = require("express");

const Post = require("../models/post");

const router = express.Router();
const path= require("path");
const fs = require("fs");
const multer =require("multer");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"uploads")
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage:storage});

router.get("/",async function(req,res){
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
router.post("/",upload.single("image"),async (req,res)=> {

    const {title, author, location } = req.body;
    const post = await Post.create({
        title, author, location, user : req.user
    })
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