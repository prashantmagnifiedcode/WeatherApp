import { Marker ,Popup,Map} from "react-leaflet";

const MyMap=({ weatherData })=> {
  return (
    <>
    <div>
        
    <Map center={[weatherData.coord.lat, weatherData.coord.lon]} zoom={13}>
      <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
        <Popup>
          <div>
            <p>Temperature: {weatherData.main.temp}</p>
            <p>Humidity: {weatherData.main.humidity}</p>
          </div>
        </Popup>
      </Marker>
    </Map>
        </div>
    </>
  );
}
export default MyMap