const express=require('express');
const UserRouter=express.Router();
const User=require('../db/index');
const jwt=require('jsonwebtoken');
const secert=process.env.JWT_SECRET;
UserRouter.get('/',(req,res)=>{
    res.send('This is user page');
})

function createjwt(email,password) {
    const payload={
        email,
        password
    }
    return jwt.sign(payload,secert,{expiresIn:'1h'});
}

function decodejwt(token) {
    //token+='a';
    //token='a'+token;
    //const data=jwt.decode(token);
    //console.log(data);
    const verified=jwt.verify(token,secert);
    console.log(verified);
}

async function ratelimitter(req,res,next) {
    console.log("hi");
    const email=await req.body.email;
    const user=await User.findOne({email});
    if(!user) {
        next();
        return;
    }
    if(user.requestspersec>=5) {
        res.status(429).send('Rate limit exceeded');
        return;
    }
    user.requestspersec=user.requestspersec+1;
    setTimeout(()=>{
        dec(email);
    },10000);
    await user.save();
    console.log(user.email);
    next();
}
async function dec(email) {
    const user=await User.findOne({email});
    if(!user) {
        res.send('User not found');
        return;
    }
    user.requestspersec=user.requestspersec-1;
    await user.save();
}
UserRouter.use(ratelimitter);
UserRouter.get('/requests',async (req,res)=>{
    const user=await User.findOne({email});
    if(!user) {
        res.send('User not found');
        return;
    }
})
UserRouter.post('/createuser',async (req,res)=>{
    const email=await req.body.email;
    const password=await req.body.password;
    const check=await User.findOne({email});
    if(check) {
        //console.log(check);
        res.send('User already exists');
        return;
    }
    const user=new User({
        email,
        password
    })
    await user.save();
    const token=createjwt(email,password);
    decodejwt(token);
    console.log(token);
    res.send("User created successfully");
})

module.exports= UserRouter;
