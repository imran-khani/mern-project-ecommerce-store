import User from '../models/User.js';  // Add the .js extension
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import bcrypt from 'bcryptjs'


const router = Router();

router.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    const userExist = await User.findOne({email});
    if (userExist) return res.status(400).json({message:'User already exist'});

    const user = new User({
        name,
        email,
        password:bcrypt.hashSync(password,20),
    });
    await user.save();
    res.status(201).json({message:'User created successfully.'});
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message:'invalid credentials'});

    const isMatch = bcrypt.compareSync(password,user.password);
    if (!isMatch) return res.status(400).json({message:'incorrect password'})
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({token})
})

export default router;