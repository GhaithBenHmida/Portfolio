import "./sh.css"
import layer from "../assets/layers.png"
import React, {useState, useRef, useEffect} from "react"
import exit from "../assets/exit.png"
import min from "../assets/min.png"
import Browser from "../subPages/Browser"
import folder from "../assets/folder.png"
import internt from "../assets/internet.png"
import gallery from "../assets/gallery.png"
import Gallery from "../subPages/Gallery"
import Calculator from "../subPages/Calculator"
import calc from "../assets/calculator.png"

export default function Window({id,type, winname, ico, mini, fun}){
    const [pos, setPos] = useState({t:110,l:150})
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 })
    const currentPos = useRef({t:110, l:150})
    const animFrameRef = useRef(null)
    const [prevsize,setPrevSize] = useState({h:380, w:600})
    const [size,setSize] = useState({h:380, w:600})
    const [full, setFull] = useState(false)
    const [minimized, setMinimized] = useState(false)

    useEffect(() => {
        setMinimized(mini)
    }, [mini]);

    useEffect(() => {
        currentPos.current = pos;
    }, [pos]);


    function handleMouseDown(e) {
        dragging.current = true;

        // If fullscreen, restore first and re-anchor under mouse
        if (full) {
            const restored = prevsize;

            // place window so cursor stays on the bar
            const newLeft = e.clientX - restored.w / 2;
            const newTop = e.clientY - 15; // title bar height

            setSize(restored);
            setPos({ l: newLeft, t: newTop });
            currentPos.current = { l: newLeft, t: newTop };
            setFull(false);

            offset.current = {
            x: restored.w / 2,
            y: 15
        };
    } else {
        offset.current = {
        x: e.clientX - currentPos.current.l,
        y: e.clientY - currentPos.current.t
        };
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}


    function handleMouseMove(e) {
        if (!dragging.current) return;

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        
        animFrameRef.current = requestAnimationFrame(() => {
            const newPos = {
                l: e.clientX - offset.current.x,
                t: e.clientY - offset.current.y
            };
            currentPos.current = newPos;
            setPos(newPos);
        });
    }

    function handleMouseUp() {
        dragging.current = false;

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }


    function full_screen(){
        if(!full){
            setPos({t:0,l:0})
            offset.current.x = 0
            offset.current.y = 0
            setPrevSize(size)
            setSize({h:"100%", w:"100%"})
        }else{
            setSize(prevsize)
        }
        setFull(prev => !prev)
    }
    function getIcon(type) {
    switch (type) {
        case "browser":
        return internt;
        case "folder":
        return folder;
        case "gallery":
        return gallery;
        case "calculator":
        return calc;
        default:
        return folder;
    }
    }


    return <>
    <div className={`window ${minimized ? "minimized" : ""}`} style={{ top: pos.t, left: pos.l, width:size.w, height:size.h}} 
      >
        <div className="window-top" >
            <div className="window-top-left" onMouseDown={handleMouseDown}>
                <img src={getIcon(type)} alt="" className="lil-ico" />
                <h6>{winname}</h6>
            </div>
            
            <div className="controls">
                <div className="cont-button" onClick={() => fun(id)}>
                    <img src={min} alt="" className="cont" />
                </div>
                <div className="cont-button" onClick={() => {full_screen();}}>
                    <img src={layer} alt="" className="cont" />
                </div>
                <div className="cont-button" id="ex">
                    <img src={exit} alt="" className="cont" />
                </div>
            </div>
        </div>

        <div className="window-centent">
            {type === "browser" && <Browser url={"https://cody-ajst.vercel.app"} />}
            {type === "gallery" && <Gallery />}
            {type === "calculator" && <Calculator />}
        </div>
    </div>
    </>
}