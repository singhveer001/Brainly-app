import type { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary";
    text : String;
    startIcon ?: ReactElement

}

const variantClasses = {
    "primary" : "bg-purple-600 text-white ",
    "secondary" : "bg-purple-200 text-purple-600"
}

const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center gap-1"

export function Button( {variant, text, startIcon} : ButtonProps){

    return <button className={variantClasses[variant] + " " + defaultStyle}>
        {startIcon} {text}
    </button>
}