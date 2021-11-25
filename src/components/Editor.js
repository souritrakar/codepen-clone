import React, {useState} from "react"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/theme/ayu-dark.css"
import "codemirror/theme/duotone-dark.css"
import "codemirror/theme/dracula.css"
import "codemirror/theme/blackboard.css"
import "codemirror/theme/lucario.css"

import "codemirror/mode/xml/xml"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"
import {Controlled as ControlledEditor} from "react-codemirror2"
import "../index.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCompressAlt, faExpandAlt} from "@fortawesome/free-solid-svg-icons"
import { Dropdown } from "react-bootstrap"
import themes from "./themes"
import useLocalStorage from "./hooks/useLocalStorage"


export default function Editor(props){

    const {
        language,
        languageName,
        value,
        onChange
    } = props

    const [open, setOpen] = useState(true);
    const [theme, setTheme] = useState("material")



    function handleChange(editor, data, value){
        onChange(value)
    }
    return(

        <div className={`editor-div ${open ? '' : 'collapsed'}`}>
           <div className="editor-header ">

            {languageName}

            <Dropdown className="theme-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {theme}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    themes.map(theme=>{
                        return(
                            <Dropdown.Item onClick={()=>{setTheme(theme["name"])}}>{theme["name"]}</Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
            </Dropdown>


            <button type="button" className="expand-collapse-btn" onClick={()=>{setOpen(prevOpen=> !prevOpen)}}>
                
                <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
            
            </button>

           

           </div>
           <ControlledEditor
           
           onBeforeChange={handleChange}
           value={value}
           className="code-mirror-wrapper"
           options={{
               lineWrapping:true,
               lint:true,
               mode:language,
               lineNumbers:true,
               theme:theme
             
           }}
           
           />
        </div>
    )
}