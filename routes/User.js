const express=require('express');
const UserRouter=express.Router();

//app.use(router);

UserRouter.get('/',(req,res)=>{
    res.send('This is user page');
})

module.exports= UserRouter;
