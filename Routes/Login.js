import express, { Router } from 'express'
import mongoose from 'mongoose';
import Register from '../models/Register.js'

const login = express.Router()
let connection =  await mongoose.connect("mongodb+srv://Abhinandan:97423257339742325733%40%40bhi.MONGODB@apsarify.k11mszi.mongodb.net/Users")

login.get('/',(req,res)=>{
    res.render('login')
})

login.post('/',async (req,res)=>{
    const {email,password,Term} = req.body
    try {
        const user = await Register.findOne({email})
        if(user.password === password){
            res.render('dashboard',{userdata:user})
        }
    } catch (error) {
        res.render('error',{Error:'Failed To Find User'})
        
    }
})

export default login ;