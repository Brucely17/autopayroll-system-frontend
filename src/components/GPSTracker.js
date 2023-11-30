// src/components/GPSTracker.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GPSTracker = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const trackLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        // Send location to the backend
        try {
          await axios.post('http://localhost:5000/update/location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log('Location updated successfully');
        } catch (error) {
          console.error('Error updating location:', error);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    const intervalId = setInterval(trackLocation, 3000); // 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {location && (
        <p>
          Current Location: {location.latitude}, {location.longitude}
        </p>
      )}
    </div>
  );
};

export default GPSTracker;
