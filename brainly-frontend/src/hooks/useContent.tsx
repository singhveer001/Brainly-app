import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent (){
    const [contents, setContents] = useState([]);

    function refresh (){
        axios.get( `${BACKEND_URL}/api/v1/content`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                console.log(response.data.data)
                setContents(response.data.data)
            })
    }

    useEffect(()=>{
        refresh()
        let interval = setInterval(() => {
            refresh()
        },10 * 1000)

        return () => {
            clearInterval(interval);
        }
    },[])

    return {contents, refresh};

}