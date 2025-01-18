import React, { useRef, useEffect, useState } from "react";
import "../../css/camera.css";
import fs from "node:fs";
import axios from "axios";

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


    
    const downloadImage = async () => {
        // Generate random clothing data
        const id = Math.floor(Math.random() * 10000); // Generate a random ID
        const type = ["Shirt", "Pants", "Dress", "Jacket", "Sweater"][Math.floor(Math.random() * 5)]; // Randomly pick a clothing type
        const name = `${type} ${Math.random().toString(36).substring(2, 7)}`; // Random clothing name
        const color = ["Red", "Blue", "Green", "Black", "White", "Gray"][Math.floor(Math.random() * 6)]; // Random color
        const formal = Math.random() < 0.5; // 50% chance for formal or not
        const temperatureRange = Math.random() < 0.5 ? "Cold" : "Warm"; // Random temperature range
        const lastWorn = new Date().toISOString(); // Current date and time
      
        // Convert canvas to base64 image
        let photo = photoRef.current;
        if (!photo) {
          console.error("No photo available to upload.");
          return;
        }
      
        const response = await axios.post('http://localhost:3000/removebg', {
            base64Image: photo.toDataURL("image/png"),
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
        });
        const imagebase64 = response.data.image;

        // Prepare clothing item data
        const clothingItem = {
          id,
          type,
          name,
          color,
          formal,
          temperatureRange,
          lastWorn,
          imagebase64,
        };
      
        // Send the POST request to the backend
        try {
          const response = await axios.post("http://localhost:3000/clothingitems", clothingItem, {
            headers: { "Content-Type": "application/json" },
          });
          console.log("Clothing item added successfully:", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to add clothing item:", {
                    message: error.message,
                    response: error.response,  // Full response from the server (if available)
                    status: error.response?.status,  // HTTP status code (if available)
                    data: error.response?.data,  // Response data from the backend
                    headers: error.response?.headers,  // Headers from the backend
                });
            } else {
                console.error("Failed to add clothing item:", (error as Error).message);
            }
            
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
