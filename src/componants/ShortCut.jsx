import "./sh.css"
import React,{useState, useEffect, useRef} from "react"

export default function ShortCut({img, name, openfun, props}){
    const [selected, setSelected] = useState(false)
    const boxRef = useRef(null)

      useEffect(() => {
        function handleClickOutside(e) {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setSelected(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, [selected]);

    function handleClick() {
        if(!selected){
            setSelected(true)
        } else {
            openfun(props)
            setSelected(false)
        }
    }
    return <>
    <div className={selected ? "shortcut selected-short" : "shortcut"} onClick={() => handleClick()} ref={boxRef}>
        <img src={img} alt="" className="shortcut-img no-select" />
        <h4 className="short-name no-select">{name}</h4>
    </div>
    </>
}