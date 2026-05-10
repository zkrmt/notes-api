import express from "express"
import verifyToken from "./middleware.js"
import router from"./auth.js"
import pool from "./db.js"

const app = express()

app.use (express.json())
app.use("/auth", router)


app.get("/notes",verifyToken,async(req,res)=>{
  
    try{
    const notes = await pool.query("SELECT * FROM notes WHERE user_id = $1 ", [req.user.id] )
    const result = notes.rows
    res.json(result)
    }catch(err){
     console.error(err)
     res.status(404).json({error:"notes not found"})
    }
})

app.post("/notes",verifyToken,async(req,res)=>{
    try{
    const {title,note}=req.body
    const notes = await pool.query("INSERT INTO notes (title,note,user_id) VALUES ($1,$2,$3) RETURNING *", [title,note,  req.user.id])
    const result = notes.rows[0]
    res.json(result)
    }catch(err){
    console.error(err)
    res.status(400).json({error:"The note content is empty"})
    }
     
})

app.put("/notes/:id",verifyToken, async(req,res)=>{
  try{ 
    const {id}=req.params
    const {title , note}=req.body
    const notes = await pool.query("UPDATE notes SET title=$1, note=$2 WHERE id=$3 AND user_id=$4", 
        [title,note,id,req.user.id])
    const result = notes.rows[0]
    res.json(result)
}catch(err){
    console.error(err)
     res.status(400).json({error:"The note content is empty"})
    }

})

app.delete("/notes/:id",verifyToken,async(req,res)=>{
    try{
     const {id}=req.params
     const notes = await pool.query("DELETE FROM notes WHERE id=$1 AND user_id =$2",
    [id,req.user.id])
    res.json({message:"The title and the note has been deleted."})
    }catch(err){
    console.log(err)
    res.status(404).json({error:"This note doesn't excist."})
    }
})

app.listen(process.env.PORT || 3001, () => console.log("You are connected to the server."))