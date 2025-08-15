import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card2 } from "../components/Card2";
import { Clip } from "../icons/Clip.";
import { Group } from "../icons/Group";
import { Logo } from "../icons/Logo";
import { Storage } from "../icons/Storage";
import { jwtDecode } from "jwt-decode";

export function Home(){

    const navigate = useNavigate();
    const token  = localStorage.getItem("token");
    const isTokenValid = () => {
        if(!token) return false;
        try {
            const {exp} = jwtDecode(token);
            if(!exp) return false;
            return Date.now() < exp * 1000;
        } catch (error) {
            return false
        }

    }
    let isAuthenticated = isTokenValid();

    const handleTryNow = () => {
        if(isAuthenticated){
            navigate('/dashboard')
        }
        else{
            navigate('/signin')
        }
    }

    return <div className="min-h-screen w-full bg-black"> 
        <nav className="flex justify-between py-4 ">
            <div className="flex ml-4 gap-2 ">
                <div className="text-purple-800 ">
                    <Logo/>
                </div>
                <div className="text-white text-xl">Brainly </div>
            </div>
            <div className="flex gap-4 mr-4 items-center">
                { isAuthenticated ? (
                    <Button onClick={() => navigate('/dashboard')} variant="primary" text={"Dashboard"}/>
                ) :(
                    <>
                        <Button onClick={() => navigate('/signin')} variant="primary" text={"Login"} />
                        <Button onClick={() => navigate('/signup')} variant="primary" text={"Signup"} />
                    </>
                )
                }
            </div>
        </nav>
        <div className="flex justify-center text-white items-center">
            <div className="my-12 flex flex-col gap-10 text-center items-center">
                <div className="font-semibold text-[1.5rem] md: text-[2rem] lg:text-[2.5rem]">
                    Link It, Love It, Come Back to It 
                    <br />
                    A Place for Everything You’ll Want Later
                </div>
                <div className="">
                    <Button onClick={handleTryNow} variant="primary" fullWidth={true} text={"Try Now"}/>
                </div>
            </div>
        </div>

        <div className="flex flex-wrap gap-10 px-8 justify-center mb-16">
            <Card2 title="Centralized Storage" description= "Save content from various sources like Twitter, YouTube, and Google Docs in one place." logo={<Storage/>}/>
            <Card2 title="Seamless Collaboration" description= "Share and collaborate on content effortlessly with teammates or friends in real-time." logo={<Group/>}/>
            <Card2 title="Multi-Media Support" description= "Save, view, and interact with YouTube videos, tweets and more" logo={<Clip/>}/>
        </div>

    </div>
}