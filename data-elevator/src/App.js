import './App.css';
import Input from '@mui/material/Input';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function App() {
  const [elevation, setElevation] = useState();
  const [latitude, setLatitude] = useState(48.210033);
  const [longitude, setLongitude] = useState(16.363449);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const url = `https://api.opentopodata.org/v1/srtm90m?locations=${latitude},${longitude}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json.results[0].elevation);
      setElevation(json.results[0].elevation);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <div>
      <h1>Data Elevator </h1>
      <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>Elevation : {elevation} meters</Popup>
        </Marker>
      </MapContainer>
      <div>
        <form onSubmit={fetchData} className="input-text">
          <label className="label" htmlFor="Latitude">
            Latitude :
          </label>
          <Input
            className="input"
            type="number"
            name="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <label htmlFor="Longitude">Longitude : </label>
          <Input
            className="input"
            type="number"
            name="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </form>
        <div className="elevate">Elevation : {elevation} meters</div>
      </div>
    </div>
  );
}

export default App;
