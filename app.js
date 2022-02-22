import express from "express";
import cors from "cors";
import User from "./database/model/User";
const app = express()
app.use(cors())
app.use(express.json())

app.post('/register', async(req, res) => {
    try{

        const {body} = req.bo 
        await User.create({
            username:req.body.username,
            password:req.body.password,
            fname:req.body.fname,
            lname:req.body.lname,
            actor:req.body.actor
        })

        res.status(200)
        .json({
            "message":"success"
        })


    }catch(e){
        console.log(e);
    }

})
app.get('/test', (req, res) => {
    res.send("Hello!")
})

export default app