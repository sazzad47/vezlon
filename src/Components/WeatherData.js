// import { useState, useEffect } from 'react';

// import {WeatherChart} from './WeatherChart'


// function WeatherData({latitude, longitude}) {
//   let [data, setData] = useState(null);

//   const getAPIData = async () => {
//     let response, issCoords, onWater, weather;
//     const ISS_API_URL = 'http://api.open-notify.org/iss-now.json';
//     const WEATHER_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=274053d1eaa04ff4bff153041220908&q=07112&days=7`;
//     const ONWATER_API_URL = 'https://api.onwater.io/api/v1/results/';

//     response = await fetch(ISS_API_URL);
//     issCoords = await response.json();
//     //console.log(`${issCoords.iss_position.latitude} ${issCoords.iss_position.longitude}`);

//     response = await fetch(
//       `${ONWATER_API_URL}${issCoords.iss_position.latitude},${issCoords.iss_position.longitude}?access_token=5YnitAGBaMtk9KV2VNub`);
//     onWater = await response.json();
//     //console.log(`APP.js onWater: ${onWater.water}`);

//     if (!onWater.water) {
//       response = await fetch(`${WEATHER_API_URL}${issCoords.iss_position.latitude},${issCoords.iss_position.longitude}`);
//       weather = await response.json();
//       //console.log(weather);

//       weather.onWater = false;
//     }
//     else {
//         /* eslint-disable no-constant-condition */
//       let debug;
//       if (debug = false) {
//         //to not wait till ISS flies over land when debugging
//         response = await fetch(`${WEATHER_API_URL}-33.8688,151.2093`);
//         weather = await response.json();
//       }
//       else {
//         weather = {};
//         weather.lon = issCoords.iss_position.longitude;
//         weather.lat = issCoords.iss_position.latitude;
//         weather.onWater = true;
//       }
//     }

//     if (window.synced) {
//       window.timers.push(setTimeout((weather) => {
//         console.log((new Date()).toString().split(' ')[4]);
//         console.log(weather);
//         setData(weather);
//       }, 34000, { ...weather }));
//     }
//     else {
//       console.log((new Date()).toString().split(' ')[4]);
//       console.log(weather);
//       setData(weather);
//     }
//   }

//   useEffect(() => {
//     getAPIData();
//     setInterval(getAPIData, 5000);
//   }, []);

//   return (
//     <>
        
      
//       <WeatherChart dataColors='["--vz-primary", "--vz-success"]' data={data} />
     
//     </>
//   );
// }

// export default WeatherData;