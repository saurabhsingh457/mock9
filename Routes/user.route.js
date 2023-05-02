const express=require('express')

const {UserModel}=require("../models/user.model")

const userRoute=express.Router()

const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt")


userRoute.get("/get",async(req,res)=>{
    let user=await UserModel.find()
    res.json(user)
})


userRoute.get("/get/:id/friends",async(req,res)=>{
    let user=await UserModel.findById(req.params.id)
    res.json(user.friends)
})



userRoute.post("/register",async(req,res)=>{
    const {name,dob,bio,email,password,posts,friends,friendRequest} = req.body

    const already=await UserModel.findOne({email})
    if(already){
        res.json("user already registered please login")
    }else{
        try {
            bcrypt.hash(password,4,async(err,sec_pass)=>{
                if(err){
                    res.json(err)
                }else{
                    const user=new UserModel({name,dob,bio,email,password:sec_pass,posts,friends,friendRequest})
                    await user.save()
                    res.json("user registration successful")
                    console.log(user)
                }
            })
        } catch (error) {
            console.log(error)
            res.json("error in hashing")
        }
    }
})


userRoute.post("/login",async(req,res)=>{
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    // res.send(user.password)
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                var token = jwt.sign({ userId: user._id }, "key")
                res.json({"msg":"login successfully","token":token,"id":user._id})
            } else {
                res.json("wrong credentials")
            }
        })
    } else {
        res.json("email password not matched")
    }
})





module.exports={userRoute}

