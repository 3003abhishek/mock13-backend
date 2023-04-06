const express=require("express");
const {UserModel}=require("../model/UserModel");
const jwt = require("jsonwebtoken");
const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{

    const payload=req.body;
    try{
        let user=new UserModel(payload);
        user.save();
        res.send("User registered successfully");
    }
    catch(err){
       res.send({message:"Something went wrong",error:err.message});
    }
    
});


userRouter.post("/login", async (req, res) => {
    const payload = req.body;
    try {
      const user = await UserModel.findOne(payload);
      if (!user) {
        return res.status(401).send({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({ message: "Logged in", token });
    } catch (err) {
      res.status(500).send({ message: "Something went wrong", error: err.message });
    }
  });
module.exports={
    userRouter
}
