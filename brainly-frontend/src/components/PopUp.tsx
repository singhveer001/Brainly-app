interface PopupProps  {
    open : boolean;
    message : string;
    onClose : () => void
}

export function PopUp({open, onClose,message}: PopupProps){

    return (open) ? (
        <div className="fixed inset-0 flex items-start justify-end bg-black/20 backdrop-blur-sm transition-all z-50">
            <div className="relative rounded-md shadow-2xl flex max-w-[400px] w-full max-h-[84px] bg-gradient-to-br from-white via-blue-50 to-gray-200 p-6 top-4 right-4 border-l-4 border-blue-400
        animate-pop">
                <button className="absolute top-2 right-3 text-gray-540 hover:text-red-500" 
                    onClick={onClose}
                >Close</button> 
                <div className="overflow-hidden text-ellipsis line-clamp-2 p-1">
                    <h1 className="text-lg font-medium italic text-gray-700">
                        {message}
                    </h1>
                </div>
            </div>
            <style>{`
                @keyframes pop {
                0% { transform: scale(0.85); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
                }
                .animate-pop {
                animation: pop 0.35s cubic-bezier(.23,.49,.36,1) both;
                }
            `}</style>
        </div>
        
    ) : ""
}
