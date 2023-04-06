const express=require("express");
require('dotenv').config();
const {connection}=require("./db");
const {userRouter}=require("./routes/User.Routes");
const app=express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Home Page");
});

app.use("/users",userRouter);

app.listen(8080,async()=>{
    try{
     await connection;
     console.log("Connected to DB");
    }
    catch(err){

    console.log(err.message);
    }
    console.log("App is running at port 8080");
})