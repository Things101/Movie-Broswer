import { useState, useEffect } from "react";

// Function to accessLocalStorage and change background
export default function useLocalStorage(key, defaultValue){
    const [value, setValue] = useState(() => {
        let currValue;

        try{
            currValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
        } catch(error){
            currValue = defaultValue;
        }

        return currValue;
    });

    useEffect(() =>{
        localStorage.setItem(key, JSON.stringify(value));
    },[key, value]);

    return [value, setValue];
}