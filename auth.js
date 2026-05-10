import pool from "./db.js"
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()
router.use(express.json())

// REGISTER

router.post("/register",async(req,res)=>{
    try{
    const {email , password }= req.body
    const cryptPassword =  await bcrypt.hash(password, 10)
    await pool.query("INSERT INTO users (email,password) VALUES ($1 ,$2)", 
    [email, cryptPassword])
    res.status(200).json({message:'Your account has been successfully created.'})
    }catch(err){
    console.error(err)
    res.status(400).json({error:"syntax error"})
}
})


// login
router.post("/login",async(req,res)=>{
    try{
    const {email,password}= req.body
    const user = await pool.query("SELECT * FROM users WHERE email = $1",[email])
    if(!user.rows[0]){return res.status(401).json({message:"user not found"})}
    const verifPassword = await bcrypt.compare(password, user.rows[0].password)
    if(!verifPassword){ return res.status(401).json({message:"Incorrect password"})}
    const token = jwt.sign({id : user.rows[0].id},process.env.JWT_SECRET)
    res.json({token})
    } catch(err){
     console.error(err)
     res.status(500).json({error:"server error"})
     }
})

export default router