const express = require('express');
const app=express();

const {connection}=require("./config/db")


app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to social media app")
})


const {userRoute}=require("./Routes/user.route")
app.use("/user",userRoute)

const {postRouter}=require("./Routes/post.route")
app.use("/", postRouter)





app.listen(3500,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }

    console.log("server running")
})