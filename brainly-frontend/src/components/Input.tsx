interface inputRef {
    placeholder : string; 
    onChange ?: any;
    value: string
}

export function Input( {onChange, placeholder, value}: inputRef) {
        return <div>
            <input value={value} onChange={onChange} placeholder={placeholder} type="text" className="px-4 py-2 border rounded m-2" ></input>
        </div>
}