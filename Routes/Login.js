import express, { Router } from 'express'
import mongoose from 'mongoose';
import Register from '../models/Register.js'

const login = express.Router()

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