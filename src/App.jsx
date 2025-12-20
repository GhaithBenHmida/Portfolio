import { useState, useRef, useEffect } from 'react'
import bg from "./assets/bg.jpg"
import ShortCut from './componants/ShortCut'
import './App.css'
import folder from "./assets/folder.png"
import win from "./assets/win.png"
import Start from './componants/StartBar'
import Window from './componants/windows'
import Win from './componants/win'
function App() {
  const [opened, setOpened] = useState(false)
  const boxRef = useRef(null)
  const [windows, setWindows] = useState([{id:"test", winname : "test windows", ico: folder,
    minimized:false
  }])
  const [pins, setPins] = useState([{id:"test", ico: folder, active: true, using:true}])

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


  function scalefromPin(id) {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, minimized: !w.minimized}
          : w
      )
    );

    setPins(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, using: !w.using}
          : w
      )
    );
  }


  return (
    <>
    <div id="container" className='no-select'>
      
      <div className="bg">
        <img src={bg} alt="" className='bgimage' />
      </div>

      
      <div className="suwi">
        {windows.map((w, index) => (
          <Window id={w.id} winname={w.winname} ico={w.ico} key={index} mini={w.minimized} fun={scalefromPin} />
        ))}
        
        <ShortCut img={folder} name={"deisngs"} />
        <ShortCut img={folder} name={"projects"} />
        {opened && <Start  ref={boxRef} />}
        
      </div>
      <div className="bar">
        <div className="win-btn-parent">
          <div className="win-btn" onClick={() => setOpened(prev => !prev)}><img src={win} alt="" className='win-btn-img' /></div>
        </div>
        <div className="wins-parent">
          
          {pins.map((p, index) => (
            <Win key={index} active={p.active} using={p.using}  icon={p.ico} id={p.id} fun={scalefromPin} />
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
