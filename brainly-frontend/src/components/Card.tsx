import { useEffect } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { EditIcon } from "../icons/EditIcon";
import { CrossIcon } from "../icons/CrossIcon";

export interface CardProps {
    _id : string;
    title : string;
    link : string;
    type : "youtube" | "twitter";
    onEdit ?: (id: string, title: string, link: string, type: "youtube" | "twitter") => void;
    onDelete ?: (id: string) => void
}

export function Card ({title, link, type, onEdit, _id, onDelete} : CardProps) {
    useEffect(() => {
        //@ts-ignore
        if (type === "twitter" && window.twttr?.widgets?.load) {
            //@ts-ignore 
            window.twttr.widgets.load();
        }
    }, [type, link]);
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-300 max-w-72 border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <a href={link} target="_blank">
                          {type === "twitter" && <TwitterIcon/>}
                          {type === "youtube" && <YoutubeIcon/>}
                        </a>
                    </div>
                    {title}
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-gray-500 cursor-pointer" 
                         onClick={ () => onEdit?.(_id!, title, link, type) }
                    >
                        <EditIcon/>
                    </div>
                    <div className="pr-2 text-gray-500 cursor-pointer" 
                         onClick={() => onDelete?.(_id!)}    
                    >
                        <CrossIcon/>
                    </div>
                </div>
            </div>

            <div className="p-4">
                { type === "youtube" && 
                    <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")}
                    title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                    </iframe>
                }

                { type === "twitter" &&
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com","twitter.com")}></a>
                    </blockquote>
                }
                
            </div>
        </div>
    </div>
}