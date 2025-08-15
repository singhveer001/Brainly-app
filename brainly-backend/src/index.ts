import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { string } from "zod";
import {User} from "./models/user.server.model"
import {Content, LinkModel} from "./models/content.server.model"
import { userMiddleware } from "./middleware";
import connectDB from "./db"
import { random } from "./utils";
import cors from 'cors';
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors());
connectDB();
const secretToken = process.env.SECRET_TOKEN as string 

app.post("/api/v1/signup", async (req, res) => {
    try {
        const {email, password} = req.body;
        const duplicateEntry  = await User.findOne({email})
        if(duplicateEntry){
            res.status(403).json({
                msg : "User Already Exist"
            })
        }
        const hashedPass =await bcrypt.hash(password,10)
        const newUser = new User({
            email,
            password : hashedPass
        })
        await newUser.save()
        const token = jwt.sign( {id : newUser._id}, secretToken , {expiresIn : "24h"})
        res.status(200).json({
            data : "User Created Successfully",
            email : newUser.email,
            token
        })
    } catch (error : any) {
            res.status(411).json({
            msg : "Internal Server Error",
            err : error.message
        })
    }    
})

// @ts-ignore
app.post("/api/v1/signin", async ( req, res )  => {
    try {
        const { email , password } = req.body
        const userData = await User.findOne({email})
        if(!userData || userData == null || userData == undefined){
            return res.status(401).json({
                msg : "User Not Found"
            })
        } 
        const verifyPassword = await bcrypt.compare(password,userData.password)
        if(!verifyPassword){
            res.status(401).json({
                msg : "Invalid Credentials"
            })
        }
        const token = jwt.sign({id : userData._id },secretToken, {expiresIn : "24h"})
        res.status(200).json({
            msg : "User Logged in successfully",
            token,
            email
        })
    } catch (error : any) {
        console.log("signIn Error")
        res.status(500).json({
            msg : "Internal server error",
            err : error.message
        })
    }
}) 

app.post("/api/v1/content",userMiddleware,async ( req, res ) => {
    try {
        const {title,link,type,tags} = req.body
        // @ts-ignore
        await Content.create({
            title,
            type,
            link,
            // @ts-ignore
            userId : req.userId,
            tags 
        })
        res.status(200).json({
            msg : "Content Created Successfully"
        })
    } catch (error: any) {
        console.log("contentCreation Error")
        res.status(500).json({
            msg : "Content Creation error",
            err : error.message
        })
    }
})

app.get("/api/v1/content",userMiddleware, async ( req, res ) => {
    try {
        // @ts-ignore
        const userID = req.userId
        const content = await Content.find({userId : userID}).populate([
            {path : "userId",model :"User", select : 'email'},
            // {path : "tags",model :"Tags", select : 'title'}
        ])
        if(!content){
            res.status(411).json({
                msg : "No data found"
            })
        }
        res.status(200).json({
            data : content
        })
    }catch (error : any) {
        console.log("getContent Error")
        res.status(500).json({
            msg : "Error Whhile Getting Data",
            err : error.message
        })
    }
})

app.delete("/api/v1/content", userMiddleware, async ( req, res ) => {
    try {
        const contentId = req.body.contentId
        const deleteContent = await Content.findByIdAndDelete(contentId)
        res.status(200).json({
            msg : "Your Content Deleted Successfully"
        })
    } catch (error : any ) {
        res.status(500).json({
            msg : "Error While Deleting Content",
            err : error.message
        })
    }
})

app.post("/api/v1/brain/share",userMiddleware, async ( req ,res ) => {
    const share = req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId : req.userId
        })
        if(existingLink){
            res.json({
                hash : existingLink.hash
            })
            return ;
        }

        const hash = random(10);
        await LinkModel.create({
            // @ts-ignore
            userId : req.userId,
            hash : hash
        })
        res.send({
            message : "/share/" + hash
        })
    }else {
        await LinkModel.deleteOne({
            // @ts-ignore
            userId : req.userId 
        })
        res.send({
            message : "Removed Link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async ( req, res ) => {
    const hash = req.params.shareLink
    const link = await LinkModel.findOne({hash})

    if(!link){
        res.status(411).json({
            message : "Sorry incorrect input"
        })
        return ;
    }
    //userId
    const content = await Content.find({
        userId : link.userId
    })

    const user = await User.findOne({
        _id : link.userId
    })
    res.json({
        //@ts-ignore
        username: user?.email,
        content : content
    })
})

app.listen(5000, () => {
    console.log("Server Started at Port 5000")
})