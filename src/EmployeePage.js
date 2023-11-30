
import React, { useState } from 'react';
import ImageCapture from './components/ImageCapture';
import GPSTracker from './components/GPSTracker';

const EmployeePage = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleImageCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
   
  };

  return (
    <div>
      <h1>Image Capture and GPS Tracking App</h1>
      <ImageCapture onCapture={handleImageCapture} />
      {capturedImage && <img src={capturedImage} alt="Captured" />}
      <GPSTracker />
    </div>
  );
};

export default EmployeePage;
