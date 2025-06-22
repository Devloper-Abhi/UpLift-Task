import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import path from 'path';
import { error } from 'console';
import Login from './Routes/Login.js';
import Register from './Routes/Register.js';

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
let connection = await mongoose.connect("mongodb+srv://Abhinandan:97423257339742325733%40%40bhi.MONGODB@apsarify.k11mszi.mongodb.net/Users")

app.use(express.static('Public'))
app.use(express.static('models'))
app.use(express.urlencoded({extended : true}))
app.set('view engine','ejs')
app.use('/login',Login)
app.use('/register',Register)

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/:slug',(req,res) => {
    const filepath = path.join(__dirname,'views',`${req.params.slug}.ejs`)
    fs.access(filepath,fs.constants.F_OK, (err)=>{
        if(err){
            res.redirect('/error')
        }else{
            res.render(`${req.params.slug}`)
        }
    })
})
app.listen(port,()=>{
    console.log(`${port} : Server is Up`)
})
