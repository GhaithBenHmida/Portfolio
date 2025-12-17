import "./sh.css"
import Line from "./line"
import file from "../assets/folder.png"
import arr from "../assets/Barrow.svg"
import React, {useState} from "react"
export default function StartCateg({title, lines}){
    const [open, setOpen] = useState(false)
    return <>
    <div className="cat">
        <div className="topcat no-select" onClick={() => setOpen(prev => !prev)}>
            <p className="toptext">{title}</p>
            <img src={arr} className={`Barrow ${!open ? "no-rot" : ""}`} alt="" />
        </div>
        <div className={`lines-parent ${!open ? "hide" : ""}`}>
            {lines.map((item, key) => (
                <Line key={key} img={item.img} t={item.text} />
            ))}
        </div>
    </div>
    </>
}