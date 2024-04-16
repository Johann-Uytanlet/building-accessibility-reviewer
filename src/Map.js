import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

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
}

export default Map;
