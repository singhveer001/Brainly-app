import {Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
console.log("kjsdgfjhsdvj",process.env.SECRET_TOKEN)
export const userMiddleware = (req:Request, res:Response, next : NextFunction) => {
    const header = req.headers["authorization"]?.split(" ")[1] ;
    console.log("header",header)
    const decoded = jwt.verify(header as string , process.env.SECRET_TOKEN as string) 
    if(decoded){
        // @ts-ignore
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({
            msg : "You are not logged in"
        })
    }
}