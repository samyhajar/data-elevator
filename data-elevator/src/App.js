import './App.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function App() {
  const [elevation, setElevation] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [changedLatitude, setChangedLatitude] = useState(45.764);
  const [changedLongitude, setChangedLongitude] = useState(4.8357);

  const handleSubmitLatitude = (evt) => {
    evt.preventDefault();
    setChangedLatitude(latitude);
  };
  console.log(latitude);

  const handleSubmitLongitude = (evt) => {
    evt.preventDefault();
    setChangedLongitude(longitude);
  };

  useEffect(() => {
    const url = `https://api.opentopodata.org/v1/srtm30m?locations=${changedLatitude},${changedLongitude}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.results[0].elevation);
        setElevation(json.results[0].elevation);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [changedLatitude, changedLongitude]);

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[changedLatitude, changedLongitude]}>
          <Popup>Hello</Popup>
        </Marker>
      </MapContainer>
      <form></form>
      <form onSubmit={(handleSubmitLatitude, handleSubmitLongitude)}>
        <label htmlFor="Latitude">Latitude</label>
        <input
          type="number"
          name="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <label htmlFor="Longitude">Longitude</label>
        <input
          type="number"
          name="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      <div>The elevation is {elevation} meters</div>
    </div>
  );
}

export default App;
