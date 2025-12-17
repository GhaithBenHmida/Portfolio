import "./sh.css"
import Line from "./line"
import file from "../assets/folder.png"
import StartCateg from "./StartCateg"
export default function Start({ref}){
    const arr1 = [
  { img: file, text: "projects" },
  { img: file, text: "projects" },
  { img: file, text: "projects" }
];
    return <>
        <div className="start" ref={ref}>
            <StartCateg title={"previous work"} lines={arr1} />
            <StartCateg title={"contact"} lines={arr1} />
            <StartCateg title={"blabla"} lines={arr1} />
            
        </div>
    </>
}