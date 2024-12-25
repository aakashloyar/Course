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
let request=0;
function reqcount(req,res,next) {
    request++;
    //console.log(request);
    next();//next is used to pass control to the next middleware function
}
app.get('/reqcount',(req,res)=>{
    res.send(`Total requests: ${request}`);
})
app.use(reqcount);

app.use('/api/user',UserRouter);
app.get('/',(req,res)=>{
    res.send('Hello world');
})

mongoose.connect(mongouri);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
