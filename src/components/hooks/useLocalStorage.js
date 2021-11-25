import { prefix } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react'

const prefixName = `codepen-clone-`

export default function useLocalStorage(key, originalValue){


    const prefixedKey  = prefixName + key;

    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey)

        if(jsonValue !=null) return JSON.parse(jsonValue)

        if(typeof originalValue === 'function'){
            return originalValue()
            
        }

        else{
            return originalValue
        }
    })


    useEffect(()=>{

        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
    
}