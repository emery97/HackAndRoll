import React, { useRef, useEffect, useState } from "react";
import "../../css/camera.css";
import axios from "axios";

function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);

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

    const downloadImage = async () => {
        let photo = photoRef.current;
        if (!photo) {
            console.error("No photo available to upload.");
            return;
        }
    
        // Step 1: Convert canvas to base64 and send it to the backend to remove the background
        const base64Image = photo.toDataURL("image/png");
    
        try {
            // Send the base64 image to the backend for background removal
            const response = await axios.post('http://localhost:3000/removebg', {
                base64Image: base64Image,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const imagebase64 = response.data.image; // Assuming the backend returns a base64 image
    
            if (!imagebase64) {
                console.error("No image returned after background removal.");
                return;
            }
    
            // Step 2: Convert the base64 image to a Blob
            const byteCharacters = atob(imagebase64.split(',')[1]); // Strip the 'data:image/png;base64,' part
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset++) {
                const byteArray = byteCharacters.charCodeAt(offset);
                byteArrays.push(byteArray);
            }
    
            const byteArray = new Uint8Array(byteArrays);
            const blob = new Blob([byteArray], { type: "image/png" });
    
            // Step 3: Prepare FormData to send the image as a file
            const formData = new FormData();
            formData.append("image", blob, "clothing-image.png");
    
            try {
                // Step 4: Send the image Blob to Gemini via a POST request
                const geminiResponse = await axios.post("http://localhost:3000/gemini", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
    
                if (geminiResponse.status === 200) {
                    console.log("Gemini response:", geminiResponse.data);
                    // Handle the response from Gemini
                }
            } catch (error) {
                console.error("Error sending image to Gemini:", error);
            }
        } catch (error) {
            console.error("Error removing background:", error);
        }
    };
    
      

    interface RemoveBgResponse {
        arrayBuffer: () => Promise<ArrayBuffer>;
    }

    // const removeBg = async (blob: Blob): Promise<ArrayBuffer> => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("image", blob, "clothing-image.png");
 
    //         try {
    //             // Send the Blob as a File to the backend
    //             const response = await axios.post("http://localhost:3000/gemini", formData, {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             });

    //             if (response.status === 200) {
    //                 console.log("Gemini response:", response.data);
    //                 // Handle the response from Gemini
    //             }
    //         } catch (error) {
    //             console.error("Error sending image to Gemini:", error);
    //         }
    //     }, "image/png");
    // };

    useEffect(() => {
        getVideo();
    }, [videoRef]);


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
