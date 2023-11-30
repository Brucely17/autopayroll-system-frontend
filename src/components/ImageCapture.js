// src/components/ImageCapture.js
import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const ImageCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const captureAndSendImage = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);

      // Send the image to the backend
      try {
        await axios.post('http://localhost:5000/upload/image', { imageSrc });
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    // Capture and send image every 5 minutes
    const intervalId = setInterval(captureAndSendImage, 300000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [webcamRef, onCapture]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
    </div>
  );
};

export default ImageCapture;
