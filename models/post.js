const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    author:{type:String,require:true},
    location:{type:String,require:true},
    image:{
        data:Buffer,
        contentType:String
    },
    title:{type:String,require:true},
    likes:{type:Number,default:'0'},
    comments:[],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});
const Post = mongoose.model("Post",postSchema);
module.exports=Post;