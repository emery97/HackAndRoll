import React, { useRef, useEffect, useState } from "react";
import "../../css/camera.css";
import fs from "node:fs";

function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const [photoCount, setPhotoCount] = useState(1); // Counter for dynamic filenames

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: { width: 1920, height: 1080 }
            })
            .then((stream) => {
                let video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.muted = true; // Mute to bypass autoplay restrictions
                    video.play().catch((error) => {
                        console.error("Error playing video:", error);
                    });
                }
            })
            .catch((err) => {
                console.error("OH NO!", err);
            });
    };

    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9);

        let video = videoRef.current;
        let photo = photoRef.current;

        if (photo && video) {
            photo.width = width;
            photo.height = height;

            let ctx = photo.getContext("2d");

            ctx?.drawImage(video, 0, 0, width, height);

            setHasPhoto(true);
        }
    };

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo?.getContext("2d");

        if (ctx) {
            ctx.clearRect(0, 0, photo?.width || 0, photo?.height || 0);
        }
        setHasPhoto(false);
    };

    const downloadImage = () => {
        let photo = photoRef.current;

        if (photo) {
            // Convert canvas content to data URL
            const dataURL = photo.toDataURL("image/png");

            // Dynamically create the filename
            const fileNumber = photoCount.toString().padStart(2, "0"); // e.g., 01, 02, etc.
            const filename = `file${fileNumber}.png`;

            // Create an anchor element and trigger download
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Increment the photo count
            setPhotoCount(photoCount + 1);
        }
    };

    interface RemoveBgResponse {
        arrayBuffer: () => Promise<ArrayBuffer>;
    }

    const removeBg = async (blob: Blob): Promise<ArrayBuffer> => {
        try {
            const formData = new FormData();
            formData.append("size", "auto");
            formData.append("image_file", blob);

            const response: Response = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: { "X-Api-Key": process.env.BGREMOVER || "" },  // Use process.env to access environment variables
                body: formData,
            });

            if (response.ok) {
                return await response.arrayBuffer();  // Returns the image data as ArrayBuffer
            } else {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error removing background:", error);
            throw error;  // Re-throwing the error so it can be handled by the caller
        }
    };
    

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div className="cameraContainer">
            <div className="camera">
                <video ref={videoRef}></video>
                <button onClick={takePhoto}>SNAP!</button>
            </div>
            <div className={"result" + (hasPhoto ? " hasPhoto" : "")}>
                <canvas ref={photoRef}></canvas>
                <div className="button-container">
                    <button onClick={closePhoto}>CLOSE!</button>
                    <button onClick={downloadImage}>DOWNLOAD!</button>
                </div>
            </div>
        </div>
    );
}

export default Camera;
