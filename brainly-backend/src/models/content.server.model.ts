import mongoose from "mongoose"
import {model, Schema } from "mongoose"

const ContentSchema = new Schema({
    title : {
        type : String,
        default : ""
    },
    link : {
        type : String
    },
    type : {
        type : String
    },
    tags :[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Tags",
            default : null
        }
    ],
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

const LinkSchema = new Schema({
    hash : {
        type : String
    },
     userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})

export const Content = model("Content",ContentSchema);
export const LinkModel = model("Links",LinkSchema)