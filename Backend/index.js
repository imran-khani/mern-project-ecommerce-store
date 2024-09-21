import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('mongo connected'))
.catch(()=>console.log('Error connecting mongo'))

const PORT = 5000

app.listen(PORT)