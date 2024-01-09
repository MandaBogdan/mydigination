import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import setCanvasPreview from "../setCanvasPreview";

const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar}) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");
    const [title, setTitle] = useState(""); 
    const [tags, setTags] = useState("");


    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const defaultCrop = {
            unit: "%",
            aspect: width / height,
            width: cropWidthInPercent,
            x: (100 - cropWidthInPercent) / 2,
            y: 0,
        };

        setCrop(defaultCrop);
    };

    return (
        <>
            <label className="block mb-3 w-fit">
                <span className="sr-only">Alege poza</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
                />
            </label>
            {error && <p className="text-red-400 text-xs">{error}</p>}

            <input
                type="text"
                placeholder="Titlul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2 px-3 mb-4 bg-gray-700 rounded-md text-slate-100 focus:outline-none"
            />

            <input
                type="text"
                placeholder="Separa tagurile prin virgula"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full py-2 px-3 mb-4 bg-gray-700 rounded-md text-slate-100 focus:outline-none"
            />

            {imgSrc && (
                <div className="flex flex-col items-center">
                    Selecteaza zona din fotografie pe care vrei sa o salvezi.
                    <ReactCrop
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Upload"
                            style={{ maxHeight: "70vh" }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <button
                        className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
                        onClick={() => {
                            setCanvasPreview(
                                imgRef.current,
                                previewCanvasRef.current,
                                crop
                            );
                            const dataUrl = previewCanvasRef.current.toDataURL();
                            updateAvatar({ imgSrc: dataUrl, title, tags });
                            closeModal();
                        }}
                    >
                        Adauga imaginea
                    </button>
                </div>
            )}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </>
    );
};

export default ImageCropper;