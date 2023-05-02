const { PostModel } = require("../models/post.model")
const { UserModel } = require("../models/user.model")

const express = require("express");

const postRouter = express.Router()

postRouter.get("/get", async (req, res) => {
    const allpost = await PostModel.find()
    res.send(allpost)
})

postRouter.get("/get/:id", async (req, res) => {
    const allpost = await PostModel.findById(req.params.id)
    res.send(allpost)
})

postRouter.post("/post", async (req, res) => {
    let post = await PostModel.insertMany(req.body)
    res.send(post)
    console.log("posted successfully")
})


postRouter.patch("/updatepost/:id", async (req, res) => {
    let post = await PostModel.findOneAndUpdate({_id: req.params.id}.req.body)
    res.send(post)
    console.log("posted updated successfully")
})

postRouter.delete("/deletepost/:id", async (req, res) => {
    let post = await PostModel.findByIdAndDelete({_id: req.params.id})
    res.send(post)
    console.log("posted deleted successfully")
})

postRouter.post("/post/:id/like", async (req, res) => {
    const post = await PostModel.findById(req.params.id)

    if (post) {
        const user= await UserModel.findById(req.params.id)
        if(user){
            if(post.like.includes(req.user.id)){
                res.send("already liked")
            }else{
                post.likes.push(req.user.id)
                await post.save()
                res.send(post)
            }
        }else{
            res.send("not authorised")
        }

    } else {
        res.send("no post")
    }
})




postRouter.post("/post/:id/comment", async (req, res) => {
    const post = await PostModel.findById(req.params.id)

    if (post) {
        const user= await UserModel.findById(req.params.id)
        if(user){
           const {text}=req.body
               const comment={
                user:req.user.id,
                text,
                createAt:new Date()
               }
            post.comments.push(comment)
            await post.save()
            res.send(post)
        }else{
            res.send("not authorised")
        }

    } else {
        res.send("no post")
    }
})



module.exports = { postRouter }