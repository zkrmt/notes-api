import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

 const verifyToken = ((req,res,next)=>{
     try{ 
     const token = req.headers.authorization.split("")[1]
     if(!token){return  res.status(401).json({message:"missing token"})}
     const tokenVerif = jwt.verify(token , process.env.JWT_SECRET)
    req.user= tokenVerif 
    next()
    }catch(err){
    console.log(err)
    res.status(401).json({error:"unauthorized access"})
    } 
    
 })

 export default verifyToken