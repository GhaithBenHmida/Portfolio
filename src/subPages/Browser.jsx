import "./subpages.css"

export default function Browser({url}){
    return <>
    <div className="browser-window">
        <iframe src={url} frameborder="0"></iframe>
    </div>
    </>
}