import express from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import bcypt from 'bcryptjs'


const router = express.Router();

router.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    const userExist = await User.findOne({email});
    if (userExist) return res.status(400).json({message:'User already exist'});

    const user = new User({
        name,
        email,
        password:bcypt.hashSync(password,10),
    });
    await user.save();
    res.status(201).json({message:'User created successfully.'});
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message:'invalid credentials'});

    const isMatch = bcypt.compareSync(password,user.password);
    if (!isMatch) return res.status(400).json({message:'incorrect password'})
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({token})
})

export default router;