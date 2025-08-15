import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin (){

        const usernameRef = useRef<HTMLInputElement>();
        const passwordRef = useRef<HTMLInputElement>();
        const navigate = useNavigate();
    
        async function signin (){
            const username = usernameRef.current?.value
            const password = passwordRef.current?.value
    
            const response = await axios.post(BACKEND_URL + "/api/v1/signin" , {
                    email : username,
                    password
            })
            const jwt = response.data.token;
            localStorage.setItem("token",jwt)
            // redirect user to dashboard
            navigate('/dashboard')
        }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center  ">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />

            <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
            </div>

            <div className="mt-3 px-4 text-sm text-center font-normal">
                Don't have an account, please <a className="underline font-semibold" href="/signup">Signup</a>
            </div>
        </div>
    </div>
}