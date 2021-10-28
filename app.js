const bodyParser =require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const indexRoutes = require("./Routes/index");
const postRoutes = require("./Routes/post");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// const fs = require('fs');
// const path = require('path');
// const multer = require("multer");
// const Post = require("./models/post");
// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,'uploads')
//     },
//     filename: (req,file,cb) => {
//         cb(null,file.fieldname + '-' + Date.now())
//     }
// });
// const upload = multer({ storage: storage});  


mongoose.connect("mongodb://localhost/instaclone");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

app.use("/posts",function (req,res,next){
    try{
        const token = req.headers.authorization?.split(" ")[1];
        // console.log(token);
        if(!token) {
             return res.status(401).json({
                 status:"failed",
                 message:"Not Authenticated"
            });
        } 

        const decoded = jwt.verify(token,`${process.env.JWT_SECRET_KEY}`);
        
        if (!decoded){
            return res.status(401).json({
                status:"failed",
                message:"Invalid token"
            })

        }

        req.user= decoded.data
    }catch(e){
        return res.status(500).json({
            status: "failed",
            message: e.message
        })

    }
   
    next();
})

// //image upload 
// app.post('/', upload.single('image'), (req, res, next) => {

// 	const obj = {
// 		author: req.body.author,
// 		title: req.body.title,
// 		location: req.body.location,
// 		img: {
// 			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
// 			contentType: 'image/png'
// 		}
// 	}
// 	Post.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			// item.save();
// 			res.redirect('/');
// 		}
// 	});
// });


app.use("/",indexRoutes);
app.use("/posts",postRoutes);
app.listen("5000",()=>console.log("server is running in 5K"));

