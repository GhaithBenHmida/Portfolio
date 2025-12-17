import { useState, useRef, useEffect } from 'react'
import bg from "./assets/bg.jpg"
import ShortCut from './componants/ShortCut'
import './App.css'
import folder from "./assets/folder.png"
import win from "./assets/win.png"
import Start from './componants/StartBar'
import Window from './componants/windows'
function App() {
  const [opened, setOpened] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        console.log("Clicked outside the div");
        setOpened(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [opened]);


  return (
    <>
    <div id="container" className='no-select'>
      <Window winname={"project gallery"} />
      <div className="bg">
        <img src={bg} alt="" className='bgimage' />
      </div>

      
      <div className="suwi">
        <ShortCut img={folder} name={"deisngs"} />
        <ShortCut img={folder} name={"projects"} />
        {opened && <Start  ref={boxRef} />}
        
      </div>
      <div className="bar">
        <div className="win-btn-parent">
        <div className="win-btn" onClick={() => setOpened(prev => !prev)}><img src={win} alt="" className='win-btn-img' /></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
