import "./sh.css"
import layer from "../assets/layers.png"
import React, {useState, useRef, useEffect} from "react"
import exit from "../assets/exit.png"
import min from "../assets/min.png"

export default function Window({winname, ico, mini}){
    const [pos, setPos] = useState({t:110,l:150})
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 })
    const [prevsize,setPrevSize] = useState({h:380, w:600})
    const [size,setSize] = useState({h:380, w:600})
    const [full, setFull] = useState(false)
    const [minimized, setMinimized] = useState(false)

    useEffect(() => {
        setMinimized(mini)
    }, [mini]);


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
            setFull(false);

            offset.current = {
            x: restored.w / 2,
            y: 15
        };
    } else {
        offset.current = {
        x: e.clientX - pos.l,
        y: e.clientY - pos.t
        };
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}


    function handleMouseMove(e) {
        if (!dragging.current) return;

        setPos({
            l: e.clientX - offset.current.x,
            t: e.clientY - offset.current.y
        });
    }   

    function handleMouseUp() {
        dragging.current = false;

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

    return <>
    <div className={`window ${minimized ? "minimized" : ""}`} style={{ top: pos.t, left: pos.l, width:size.w, height:size.h}} 
      >
        <div className="window-top" >
            <div className="window-top-left" onMouseDown={handleMouseDown}>
                <img src={ico} alt="" className="lil-ico" />
                <h6>{winname}</h6>
            </div>
            
            <div className="controls">
                <div className="cont-button" onClick={() => setMinimized(true)}>
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
    </div>
    </>
}