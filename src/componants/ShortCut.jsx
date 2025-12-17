import "./sh.css"

export default function ShortCut({img, name}){
    return <>
    <div className="shortcut">
        <img src={img} alt="" className="shortcut-img no-select" />
        <h4 className="short-name no-select">{name}</h4>
    </div>
    </>
}