import express, { Router } from "express";
import mongoose from "mongoose";
import Register from "../models/Register.js";

const register = express.Router();
register.use(express.urlencoded({extended : true}))
await mongoose.connect(
  "mongodb+srv://Abhinandan:97423257339742325733%40%40bhi.MONGODB@apsarify.k11mszi.mongodb.net/Users"
);
register.get('/',(req,res) => {
    res.render('register')
})

register.post("/", async (req, res) => {
  const { name, username, email, password, term} = req.body;
  try {
    const userdata = await Register.findOne({ email })
    const user = new Register({
      name:name,
      username:username,
      email:email,
      password:password,
      term:term,
    });
    if(userdata){
      if(userdata.password === password){
        res.render('dashboard',{userdata:userdata})
      }
    }else{
      await user.save()
      const userdata = await Register.findOne({ email })
      if(userdata.password === password){
        res.render('dashboard',{userdata:userdata})
      }
    }
  } catch (error) {
    res.render("error", { Error: "Failed To Find User" });
  }
});

export default register;
