import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Signup (){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function signup (){
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup` , {
                email : username,
                password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt)
        navigate('/dashboard')
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center  ">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input value={username} onChange={(e:any) => setUsername(e.target.value)} placeholder="Username" />
            <Input value={password} onChange={(e:any) => setPassword(e.target.value)} placeholder="Password" />

            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
            </div>
            <div className="mt-3 px-4 text-sm text-center font-normal">
                Already have an account, please <a className="underline font-semibold" href="/signin">Signin</a>
            </div>
        </div>
    </div>
}