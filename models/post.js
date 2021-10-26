const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{type:"string",require:true},
    image:{type:"string"},
    author:{type:"string",require:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    location:{type:"string",require:true}    
    // likes:{type:"Number",default:0}
});
const Post = mongoose.model("Post",postSchema);
module.exports=Post;