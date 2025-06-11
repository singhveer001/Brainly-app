import {Schema, model} from "mongoose"

const TagSchema =  new Schema({
    title : {
        Type : String,
        default : null
    }
})

export const TagModel = model("Tags",TagSchema)