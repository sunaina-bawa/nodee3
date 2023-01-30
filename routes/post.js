const {Router} = require("express")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


require("dotenv").config()

const {PostModel} = require("../models/post")

const postInfo = Router();


postInfo.get("/", async (req, res) => {

    const {usertag} = req.query

    const Post = await PostModel.find({userId : req.body.userId, usertag})
    res.send(Post)
})


postInfo.post("/create", async (req, res) => {
    const {title, body, device, userId} = req.body;
    const post = new PostModel({
        title,
        body,
        device,
        userId

    })
    try{
        await post.save()
        res.send("create post")
    }
    catch(err){
        res.send("something went wrong")
    }
})

postInfo.patch("/update/:postId", async (req, res) => {

    const {postId} = req.params


    const updatePost = await PostModel.findOneAndUpdate({_id : postId, userId : req.body.userId},req.body)
    if(updatePost){
        res.send("updated")
    }
    else{
        res.send("not modify")
    }
})


postInfo.delete("/delete/:postId", async (req, res) => {
    const {postId} = req.params
    const deletePost = await PostModel.findOneAndDelete({_id : postId, userId : req.body.userId})
    if(deletePost){
        res.status(200).send("Delete")
    }
    else{
        res.send("not delete")
    }
})



module.exports = {
    postInfo
}