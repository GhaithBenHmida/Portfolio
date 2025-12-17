import "./sh.css"
import arr from "../assets/arrow.svg"
export default function Line({img, t}){
    return <>
    <div className="line no-select">
        <div className="group">
            <img src={img} alt="" className="line-img" />
            <h5 className="line-text">{t}</h5>
        </div>
        <img src={arr} alt="" className="line-img-arr" />
    </div>
    </>
}