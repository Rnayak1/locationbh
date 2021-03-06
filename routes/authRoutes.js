const express= require('express')
const mongoose=require('mongoose')
const router=express.Router();

const User= mongoose.model('user');

router.get('/Update',async(req,res)=>{
    const {phone_number, address}=req.query;
    try{
        const response = await User.update({'phone_number':phone_number}, {$push: {'address': address}});
            res.send("success");
    }
    catch(err)
    {
        res.send(err.message);
    }
})

router.get('/Check', async(req,res)=>{
    const {phone_number}=req.query
    try{
        const user= await User.find({'phone_number' : phone_number}).countDocuments();
        console.log(user);
        if(user>0)
        {
            res.send("exist");
        }
        else{
            res.send("not");
        }
    }
    catch(err)
    {
        res.send(err.message);
    }
})

router.get('/Register', async(req,res)=>{
    const {phone_number}=req.query
    try{
        const user=new User({phone_number});
        await user.save();
        res.send("success");
    }
    catch(err)
    {
        res.send(err.message);
    }
})


router.get('/Signin', async(req,res)=>{
    const {phone_number}=req.query
    try{
        const user=await User.find({phone_number});
        res.send(user);
    }
    catch(err)
    {
        res.send(err.message);
    }

})

module.exports=router
