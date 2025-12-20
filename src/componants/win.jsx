import "./sh.css"
import React, {useState} from "react"

export default function Win({icon, active, id , fun, using}){
    
    return <>
    <div className={`win ${using ? "using" : ""}`} onClick={() => {fun(id)
        setUsing(prev => !prev)
    }}>
        <img src={icon} alt="" className="win-img" />
        {active && <div className="ac" />}
    </div>
    </>
}