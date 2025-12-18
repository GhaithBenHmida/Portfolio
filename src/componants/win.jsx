import "./sh.css"

export default function Win({icon, active, using,}){
    return <>
    <div className={`win ${using ? "using" : ""}`}>
        <img src={icon} alt="" className="win-img" />
        {active && <div className="ac" />}
        

    </div>
    </>
}