import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

interface sidebarProps {
    setSelectedType : (type : "all" | "youtube" | "twitter") => void;
}

export function Sidebar ({setSelectedType}: sidebarProps) {
    const navigate = useNavigate();
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div onClick={() => navigate('/')} className="flex text-2xl pt-4 items-center cursor-pointer ">
            <div className=" pr-2 text-purple-800">
                <Logo/>
            </div>
                Brainly
        </div>
        <div className="pt-4 pl-4">
            <SidebarItem onClick={() => setSelectedType("twitter")}  text="Twitter" icon={<TwitterIcon/>} />
            <SidebarItem onClick={() => setSelectedType("youtube")} text="Youtube" icon={<YoutubeIcon/>} />
        </div>
    </div>
}