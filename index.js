const port=3000;
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const router=express.Router();
require('dotenv').config(); // Load environment variables from .env file
const mongouri=process.env.MONGOURI
app.use(bodyParser.json());
const UserRouter=require('./routes/User');


app.use('/api/user',UserRouter);
app.get('/',(req,res)=>{
    res.send('Hello world');
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
