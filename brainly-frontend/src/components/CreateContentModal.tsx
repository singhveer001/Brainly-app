import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import {Input} from "./Input"
import { BACKEND_URL } from "../config";
import axios from 'axios';
// Controlled component

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal ({open, onClose, initialData} : {
    open: boolean;
    onClose: () => void;
    initialData : {
        _id: string,
        title: string,
        link: string,
        type: "youtube" | "twitter"
    } | null;
}) {

    const [title, setTitle] = useState("")
    const [linkValue, setLinkValue] = useState("")
    const [type,setType] = useState(ContentType.Youtube)

    useEffect(() => {
        if(initialData){
            setTitle(initialData?.title || "")
            setLinkValue(initialData?.link || "")
            setType(initialData?.type as ContentType || ContentType.Youtube)
        }else{
            setTitle("");
            setLinkValue("");
            setType(ContentType.Youtube)
        }
    },[initialData,open])

    async function addContent (){
        if(initialData?._id){
            await axios.put(`${BACKEND_URL}/api/v1/content/${initialData._id}`,{
                title,
                link: linkValue,
                type
            },{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
        }else{
            await axios.post(`${BACKEND_URL}/api/v1/content`,{
                title,
                link: linkValue,
                type
            },{
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
        }
        onClose();
    }

    return <div>
        {open && <div>             
            <div className="w-screen  h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">

            </div>
            <div className="w-screen  h-screen fixed TOP-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center ">
                    <span className="bg-white opacity-100 p-4 rounded-md fixed">
                        <div className="flex justify-end ">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon/>
                            </div>
                        </div>
                        <div>
                            <Input value={title} onChange={(e:any) => setTitle(e.target.value)} placeholder={"title"}/>
                            <Input value={linkValue} onChange={(e: any) => setLinkValue(e.target.value)} placeholder={"link"}/>
                        </div>
                        <div>
                            <h1 className="text-center mb-2 font-bold text-purple-600">Type</h1>
                            <div className="flex gap-3 justify-center pb-2">
                                <Button text={"Youtube"} variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={ () => {
                                    setType(ContentType.Youtube)
                                }}></Button>
                                <Button text={"Twitter"} variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={ () => {
                                    setType(ContentType.Twitter)
                                }}></Button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text={initialData ? "Update" : "Submit"} />
                        </div>
                    </span>
                </div>
            </div>
            
        </div>}
    </div>

}
