import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';

 function Map() {
  const [markers, setMarkers] = useState([]);

   function AddMarkerToClick() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const name = prompt("Enter the name for the marker:");
        if (name) {
          const rating = prompt("Enter the rating (1-5) for the marker:");
          const comments = prompt("Enter comments for the marker:");

          const newMarker = {
            id: Date.now(),
            position: [lat, lng],
            popupContent: `
              <b>Name:</b> ${name}<br>
              <b>Rating:</b> ${rating}<br>
              <b>Comments:</b> ${comments || "No comments"}
            `
          };


          setMarkers(prevMarkers => [...prevMarkers, newMarker]);

          let latlng = e.latlng
          let ratingCounts = [0, 0, 0, 0, 0];
          switch(parseInt(rating)) { // Parse rating to int
            case 1:
              ratingCounts[0] = 1; // Update ratingCounts array index
              break;
            case 2:
              ratingCounts[1] = 1;
              break;
            case 3:
              ratingCounts[2] = 1;
              break;
            case 4:
              ratingCounts[3] = 1;
              break;
            case 5:
              ratingCounts[4] = 1;
              break;
            default:
              ratingCounts = [0, 0, 0, 0, 0];
          }
          let numberOfRaters = 1;
          let markerData = {name, latlng, rating, ratingCounts, numberOfRaters, comments}

          // Call addMarker function immediately
          (async () => {
            try {
              await addMarker(markerData);
            } catch (error) {
              console.error('Error adding marker:', error.response.data.message);
              // Handle error here
            }
          })();
        }
      },
    });
    return null;
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px" }}>
        <AddMarkerToClick />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {markers.map(marker => (
        <Marker position={marker.position} key={marker.id}>
          <Popup>{marker.popupContent}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  async function addMarker(markerData) {
    try {
      console.log('Sending marker data:', markerData);
      const response = await axios.post('/markers', markerData);
      return response.data;
    } catch (error) {
      console.error('Error adding marker:', error.response.data.message);
      throw error;
    }
  }
  
}

export default Map;
