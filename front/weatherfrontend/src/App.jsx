import React, { useState, useEffect } from "react";

import { Map, Marker, Popup ,TileLayer} from "react-leaflet";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import MyTable from './Component/WeatherRecordTable'
import L from 'leaflet';
import TablePagination from '@mui/material/TablePagination';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

import AirIcon from '@mui/icons-material/Air';
import CircularProgress from '@mui/material/CircularProgress';
const App=()=> {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("London");
  const [MapShow, setMapShow] = useState(true);
  const[Icons,setIcons]= useState([
    { id:"01d" ,status:" sunny.png"},
 {id:"01n",status: "sunny.png"},
 {id:"02d", status:"clouds.png "},
 {id:"02n", status:"clouds.png "},
 {id:"03d", status:"clouds.png "},
 {id:"03n", status:"clouds.png "},
 {id:"04d", status:"clouds.png "},
 {id:"04n", status:"clouds.png "},
 {id:"09d", status:"rain.png"},
 {id:"09n", status:"rain.png"},
 {id:"10d", status:"rain.png"},
 {id:"10n", status:"rain.png"},
 {id:"11d", status:"thunder.png"},
 {id:"11n", status:"thunder.png"},
 {id:"13d", status:"snowfall.png"},
 {id:"13n", status:"snowfall.png"},
 {id:"50d", status:"sunny.png"},
 {id:"50n", status:"sunny.png"}])
  
  const getWeather=async(city)=> {
    const { data } = await axios.get('/api/weather');
    console.log("data",data)
    
    setWeatherData(data)
    // return data;
  }
  const [location, setLocation] = useState(null);

  

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("postion",position)
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      },
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    getWeather(city)
    // return () => clearup();
  }, [city]);

  const flag=(iconCode)=>{
    return L.icon({
        iconUrl: iconCode,
        iconSize:     [18, 18],
         // point of the icon which will correspond to marker's location
        // point from which the popup should open relative to the iconAnchor
      });
    
  }


return (
    <div className="flex justify-center flex-col items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 w-full">
      
<h1 class="mb-4 mt-5 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Weather Forcasting App</h1>

     
      <div style={{height:"70vh",width:"84%"}} className=" mb-5 mt-10 ">

     { location?.lat?
        <Map center={[20.5937, 78.9629]}   style={{ height: '100%', width: '100wh',borderRadius:"10px" }} zoom={5}>
              <TileLayer
                // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              weatherData?.length?
              weatherData.map((e,idx)=>{
                const showicon=Icons.filter((item) =>item.id==e.weather[0].icon)
                return(
                  <>
                   <Marker position={[ e.coord.lat,e.coord.lon]} 
                   
                   
                   icon={flag(showicon[0].status)} 
                   
                   key={idx}>
            <Popup>
              <div>
                
                <p
                 className="w-full flex items-center text-xs px-3 h-10 my-2 outline-none rounded-md border focus:shadow-sm"
                ><DeviceThermostatIcon style={{color:"red"}}/>Temperature: {e.main.temp} Clesius</p>
                <p  className="w-full flex items-center text-xs px-3 h-10 my-2 outline-none rounded-md border focus:shadow-sm">City: {e.name}</p>
                <p  className="w-full flex items-center text-xs px-3 h-10 my-2 outline-none rounded-md border focus:shadow-sm">Humidity: {e.main.humidity}</p>
                <p  className="w-full flex items-center text-xs px-3 h-10 my-2 outline-none rounded-md border focus:shadow-sm">Weather: {e.weather[0].description}</p>
                <p  className="w-full flex items-center text-xs px-3 h-10 my-2 outline-none rounded-md border focus:shadow-sm"><AirIcon/>Wind Speed: {e.wind.speed}</p>
              </div>
            </Popup>
          </Marker>
                  </>
                )
              })

         :null
            }
        </Map>
        
      :
      <div className="flex justify-center ">
      <CircularProgress style={{fontSize:"15px"}}/>
      </div>
      
      }
      </div>
      
<h1 class="mb-10 mt-5 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> City on Map</h1>
      <div className="mb-10  w-full flex justify-center items-center  ">
      {weatherData?.length? <MyTable weatherData={weatherData}/>:<CircularProgress style={{fontSize:"15px"}}/>}
      </div>
    </div>
  );
}



export default App



