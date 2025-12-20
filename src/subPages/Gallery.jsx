import "./subpages.css"

export default function Gallery({text = "General Gallery Page", images = []}) {
    return <>
    <div className="gallery-window">
        <h2 id="gal-t">{text}</h2>
        <div className="images-container">
            {images.length === 0 && <p>No images to display.</p>}
            {images.map((imgSrc, index) => (
                <div className="image-item" key={index}>
                    <img src={imgSrc} alt={`Gallery Image ${index + 1}`} className="img-in-gallery" />
                </div>
            ))}
        </div>
    </div>
    </>
}