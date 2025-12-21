import { useState, useRef, useEffect, useInsertionEffect } from 'react'
import bg from "./assets/bg.jpg"
import ShortCut from './componants/ShortCut'
import './App.css'
import win from "./assets/win.png"
import Start from './componants/StartBar'
import Window from './componants/windows'
import Win from './componants/win'
import { icons } from './icons'


function App() {
  const shortCuts = [
    {img: icons.internt, name:"browser", props:{type:"browser", winname:"browser", id: "browser"+Date.now(), ico: icons.internt, active:true, using:true}},
    {img: icons.gallery, name:"gallery", props:{type:"gallery", winname:"gallery", id: "gallery"+Date.now(), ico: icons.gallery,  active:true, using:true}},
    {img: icons.calc, name:"calculator", props:{type:"calculator", winname:"calculator", id: "calculator"+Date.now(), ico: icons.calc,  active:true, using:true}},
    {img: icons.folder, name:"projects" ,props:{type:"folder", winname:"projects", id: "folder"+Date.now(), ico: icons.folder,  active:true, using:true}},
  ]
  const [opened, setOpened] = useState(false)
  const boxRef = useRef(null)
  const [windows, setWindows] = useState([])
  const [pins, setPins] = useState([])


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

  function openWindow(props) {
    setWindows(prev => [...prev, props])

    setPins(prev => [...prev, {id:  props.id, ico:  props.ico, active:  props.active, using: props.using}])
  }

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

  function closewindow(id) {
    setWindows(prev => prev.filter(w => w.id !== id))

    setPins(prev => prev.filter(p => p.id !== id))
  }
  

  return (
    <>
    <div id="container" className='no-select'>
      
      <div className="bg">
        <img src={bg} alt="" className='bgimage' />
      </div>

      
      <div className="suwi">
        {windows.map((w, index) => (
          <Window id={w.id} type={w.type} winname={w.winname}  key={index} mini={w.minimized} fun={scalefromPin} 
          closeWin={closewindow} />
        ))}
        {shortCuts.map((sc, index) => (
          <ShortCut img={sc.img} name={sc.name} key={index} openfun={openWindow} props={sc.props} />
        ))}
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
