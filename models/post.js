const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{type:"string",require:true},
    body:{type:"string"},
    image:{type:"string",require:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});
const Post = mongoose.model("Post",postSchema);
module.exports=Post;