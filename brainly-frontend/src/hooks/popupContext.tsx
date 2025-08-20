import { createContext, useContext, useState } from "react";
import { PopUp } from "../components/PopUp";


const popupContext = createContext<any>(null);

export const PopupProvider = ({children}: {children :  React.ReactNode}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const showPopup = (msg : string) => {
        setMessage(msg);
        setOpen(true);
        setTimeout( () => setOpen(false),3000);
    }

    return (
        <popupContext.Provider value={{showPopup}}>
            {children}
            <PopUp open={open} message={message} onClose={() => setOpen(false)}/>
        </popupContext.Provider>
    )
}

export const usePopup = () => useContext(popupContext) ;