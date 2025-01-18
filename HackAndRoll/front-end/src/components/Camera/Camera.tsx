import React, { useRef, useEffect, useState } from "react";
import "../../css/camera.css";

function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: { width: 1920, height: 1080 }
            })
            .then((stream) => {
                let video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.muted = true;  // Mute to bypass autoplay restrictions
                    video.play().catch((error) => {
                        console.error('Error playing video:', error);
                    });
                }
            })
            .catch((err) => {
                console.error("OH NO!", err);
            });
    };

    const takePhoto = () => {
        const width = 414;
        const height = width/ (16 / 9);

        let video = videoRef.current;
        let photo = photoRef.current;

        if(photo && video){
            photo.width = width;
            photo.height = height;
    
            let ctx = photo?.getContext('2d');
    
            ctx?.drawImage(video, 0, 0, width, height);

            setHasPhoto(true);
        }
    }

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo?.getContext('2d');

        if (ctx) {
            ctx.clearRect(0, 0, photo?.width || 0, photo?.height || 0);
        }
        setHasPhoto(false);
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div className="cameraContainer">
            <div className="camera">
                <video ref={videoRef}></video>
                <button onClick={takePhoto}>SNAP!</button>
            </div>
            <div className={'result' + (hasPhoto ? ' hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button onClick={closePhoto}>CLOSE!</button>
            </div>
        </div>
    );
}

export default Camera;
