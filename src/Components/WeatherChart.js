import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import moment from "moment-timezone";
import WeeklyWeather from './WeeklyWeather';
import TodaysWeather from './TodaysWeather';

function getChartColorsArray(colors) {
    colors = JSON.parse(colors);
    return colors.map(function (value) {
        var newValue = value.replace(" ", "");
        if (newValue.indexOf(",") === -1) {
            var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
            if (color.indexOf("#") !== -1)
                color = color.replace(" ", "");
            if (color) return color;
            else return newValue;
        } else {
            var val = value.split(',');
            if (val.length === 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
  }

const WeatherChart = ({latitude, longitude, dataColors }) => {
    const [weatherData, setWeatherData] = useState({})

    // const getWeatherData = async () => {
    //     const res = await fetch(
    //         `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=783846624ca63c9a9fcdd9321a7c9318&exclude=minutely&units=metric`
    //       );
        
    //       const data = await res.json();
    //       setWeatherData(data)
    //       console.log('data', data)
         
    // }
    useEffect ( () => {

    const getWeatherData = async () => {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=9ff929331fff018a45487cc72df2643f&exclude=minutely&units=metric`
          );
        // const res = await fetch(
        //     `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=783846624ca63c9a9fcdd9321a7c9318&exclude=minutely&units=metric`
        //   );
        
          const data = await res.json();
          setWeatherData(data)
          console.log('data', data)
         
    }
  
        getWeatherData()
       
        
         
     }, [latitude, longitude])
     

    // const getHourlyWeather = (hourlyData, timezone) => {
    //     const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    //     const eodTimeStamp = Math.floor(endOfDay / 1000);
      
    //     const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);
      
    //     return todaysData;
    //   };

    //   const hourlyWeather = getHourlyWeather(weatherData.hourly, weatherData.timezone);

      const weeklyWeather = weatherData?.daily;
    //   console.log('weekly',weeklyWeather)

      const timezone = weatherData.timezone

    // const url = `https://api.openweathermap.org/data/2.5/forecast?q='London'&appid=32ba0bfed592484379e51106cef3f204`
    
    const days = weeklyWeather?.map((day) => {
        return moment.unix(day.dt).tz(timezone).format("dddd")
    })
    // console.log('days', days)
    const maxTemps = weeklyWeather?.map((maxTemp) => {
        return maxTemp.temp.max
        
    })
    const minTemps = weeklyWeather?.map((minTemp) => {
        return minTemp.temp.min
        
    })
    const windSpeed = weeklyWeather?.map((wind) => {
        return wind.wind_speed
        
    })
    const humidityData = weeklyWeather?.map((humidity) => {
        return humidity.humidity
        
    })
    const cloudData = weeklyWeather?.map((cloud) => {
        return cloud.clouds
        
    })
    console.log('humidity', cloudData)
    // const maxTemp1 = weeklyWeather[0].temp.max;
    // const maxTemp2 = weeklyWeather[1].temp.max;
    // const maxTemp3 = weeklyWeather[2].temp.max;
    // const maxTemp4 = weeklyWeather[3].temp.max;
    // const maxTemp5 = weeklyWeather[4].temp.max;
    // const maxTemp6 = weeklyWeather[5].temp.max;
    // const maxTemp7 = weeklyWeather[6].temp.max;
   
    // const minTemp1 = weeklyWeather[0].temp.min;
    // const minTemp2 = weeklyWeather[1].temp.min;
    // const minTemp3 = weeklyWeather[2].temp.min;
    // const minTemp4 = weeklyWeather[3].temp.min;
    // const minTemp5 = weeklyWeather[4].temp.min;
    // const minTemp6 = weeklyWeather[5].temp.min;
    // const minTemp7 = weeklyWeather[6].temp.min;
    
    // let days = []
    // days.push.apply(days, weeklyWeather)
    
    
    var WeatherChartColors = getChartColorsArray(dataColors);
    var series = [
    {
        name: "Max Temp",
        data: maxTemps
    },
    {
        name: "Min Temp",
        data: minTemps
    },
    {
        name: "Wind",
        data: windSpeed
    },
    {
        name: "Cloud Average",
        data: cloudData
    },
    {
        name: "Humidiy",
        data: humidityData
    },
    ];
    var options = {
        chart: {
            height: 380,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        colors: WeatherChartColors,
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [3, 3],
            curve: 'straight'
        },
        title: {
            text: 'Weather forecast',
            align: 'left',
            style: {
                fontWeight: 'bold',
                fontSize:'25px'
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2
            },
            borderColor: '#f1f1f1'
        },
        markers: {
            style: 'inverted',
            size: 6
        },
        xaxis: {
            categories: days,
            title: {
                text: 'Day'
            }
        },
        yaxis: {
            min: 1,
            max: 100
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
            }
        }]
    };
    // if (data === null) {
    //     return (
    //         <div className='weather'>Loading...</div>
    //     );
    // }
    // if (typeof data.current === 'undefined' && typeof data.location === 'undefined') {
    //     return (
    //         <div className='weather'>
    //             <br />
    //             <p>No weather data.. It's {data.onWater ? 'water' : 'an unknown land'}..</p>
    //             <p><br />Latitude (vertical): {data.lat}°<br />Longitude (horizontal): {data.lon}°</p>
    //         </div>
    //     );
    // }
    return (
        <React.Fragment>
            {/* <button onClick={getWeatherData}>getData</button> */}
            {/* <WeeklyWeather weeklyWeather={weeklyWeather} timezone= {timezone} /> */}
            {/* <TodaysWeather weather={weatherData.current} timezone={timezone} /> */}
            {weatherData? <ReactApexChart
                options={options}
                series={series}
                type="line"
                height="380"
                className="apex-charts"
            />:'not found'}
        </React.Fragment>
    );
};

export {WeatherChart}