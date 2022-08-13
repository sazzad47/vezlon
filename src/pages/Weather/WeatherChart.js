import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import moment from "moment-timezone";
import WeeklyWeather from './WeeklyWeather';
import TodaysWeather from './TodaysWeather';
import TempConverter from './TempConverter';
import Quantities from './Quantities';
import ISSData from './issData';

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
            `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=3eef9f2d84e05f88af25418a5a1c6ba0&exclude=minutely&units=metric`
          );
        // const res = await fetch(
        //     `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=783846624ca63c9a9fcdd9321a7c9318&exclude=minutely&units=metric`
        //   );
        
          const data = await res.json();
          setWeatherData(data)
         
         
    }
  
        getWeatherData()
       
        
         
     }, [])
     console.log('data', weatherData)

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
        return moment.unix(day.dt).tz(timezone).format("MMM Do YY");
    })
    
    const [tempUnit, setTempUnit] = useState();
    const [speedUnit, setSpeedUnit] = useState();
    const [pressureUnit, setPressureUnit] = useState();
   
    const maxTempConverter = (tempUnit) => {
        switch(tempUnit) {
            case 'Kelvin':
                
                return {data:weeklyWeather?.map((maxTemp) => 
                    maxTemp.temp.max + 273.15
                    
                ), suffix: ' K'};
            case 'Celsius':
                return {data:weeklyWeather?.map((maxTemp) =>
                    maxTemp.temp.max
                    
                ), suffix: ' °C'};
                
                
            case 'Fahrenheit':
                return {data:weeklyWeather?.map((maxTemp) => 
                    maxTemp.temp.max * (9 / 5) + 32
                    
               ), suffix: ' °F'};
                default:
                    return {data:weeklyWeather?.map((maxTemp) =>
                        maxTemp.temp.max
                        
                    ), suffix: ' °C'};
        }
    }
   
            const minTempConverter = (tempUnit) => {
                switch(tempUnit) {
                    case 'Kelvin':
                        
                        return {data: weeklyWeather?.map((minTemp) => 
                            minTemp.temp.min + 273.15
                            
                        ), suffix:' K'};
                    case 'Celsius':
                        return {data:weeklyWeather?.map((minTemp) =>
                            minTemp.temp.min
                            
                        ), suffix: ' °C'};
                        
                        
                    case 'Fahrenheit':
                        return {data:weeklyWeather?.map((minTemp) => 
                            minTemp.temp.min * (9 / 5) + 32
                            
                    ), suffix: ' °F'};
                        default:
                            return {data:weeklyWeather?.map((minTemp) =>
                                minTemp.temp.min
                                
                            ), suffix: ' °C'};
                }
            }
            const speedConverter = (speedUnit) => {
                switch(speedUnit) {
                    case 'Miles per hour':
                        
                        return {data: weeklyWeather?.map((wind) => 
                            wind.wind_speed * 2.236936
                            
                        ), suffix:' mph'};
                    case 'Meter per second':
                        return {data: weeklyWeather?.map((wind) => 
                            wind.wind_speed 
                            
                        ), suffix:' ms⁻¹'};
                        
                        
                    case 'Kelometer per hour':
                        return {data: weeklyWeather?.map((wind) => 
                            wind.wind_speed * 3.6
                            
                        ), suffix:' kmh⁻¹'};
                        default:
                            return {data: weeklyWeather?.map((wind) => 
                                wind.wind_speed 
                                
                            ), suffix:' ms⁻¹'};
                }
            }
            const pressureConverter = (pressureUnit) => {
                switch(pressureUnit) {
                    case 'Hectopascal':
                        
                        return {data: weeklyWeather?.map((pressure) => 
                            pressure.pressure
                            
                        ), suffix:' hpa'};
                    case 'Pascal':
                        return {data: weeklyWeather?.map((pressure) => 
                            pressure.pressure * 100
                            
                        ), suffix:' pa'};
                        
                        
                    case 'Standard atmosphere':
                        return {data: weeklyWeather?.map((pressure) => 
                            pressure.pressure * 0.000987
                            
                        ), suffix:' atm'};
                        default:
                            return {data: weeklyWeather?.map((pressure) => 
                                pressure.pressure
                                
                            ), suffix:' hpa'};
                }
            }
   
   
    const humidityData = weeklyWeather?.map((humidity) => {
        return humidity.humidity
        
    })
    const pressureData = weeklyWeather?.map((pressure) => {
        return pressure.pressure
        
    })
    const cloudData = weeklyWeather?.map((cloud) => {
        return cloud.clouds
        
    })

   
    
    
   
    
    var WeatherChartColors = getChartColorsArray(dataColors);
   
    var series = [
        {
            name: "Max Temp",
            type: "line",
            data: maxTempConverter(tempUnit).data
        },
        {
            name: "Min Temp",
            type: "line",
            data: minTempConverter(tempUnit).data
        },
        {
            name: "Wind Speed",
            type: "line",
            data: speedConverter(speedUnit).data
        },
        {
            name: "Cloud Average",
            type: "line",
            data: cloudData
        },
        {
            name: "Humidity",
            type: "line",
            data: humidityData
        },
        {
            name: "Pressure",
            type: "line",
            data: pressureConverter(pressureUnit).data
        },
       
    ]

    var options = {
        
        chart: {
            height: 350,
            type: "line",
            stacked: false,
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },
        title: {
        text: 'Weather Forecast',
        align: 'left',
        style: {
            fontWeight: 500,
         },
        },
        xaxis: {
            categories: days,
        },
        yaxis: [
            {
                seriesName: "Max Temp",
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#008FFB"
                },
                labels: {
                    style: {
                        colors: ["#008FFB"]
                    },
                    formatter: function (value) {
                        return value.toFixed(2) + maxTempConverter(tempUnit).suffix;
                      }
                },
                title: {
                    text: "Max Temp",
                    style: {
                        color: "#008FFB"
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            {
                seriesName: "Min Temp",
                
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#FEB019"
                },
                labels: {
                    style: {
                        colors: ["#FEB019"]
                    },
                    formatter: function (value) {
                        return value.toFixed(2) + minTempConverter(tempUnit).suffix;
                      }
                },
                title: {
                    text: "Min Temp",
                    style: {
                        color: "#FEB019"
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            {
                seriesName: "Wind Speed",
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#008FFB"
                },
                labels: {
                    style: {
                        colors: ["#008FFB"]
                    },
                    formatter: function (value) {
                        return value.toFixed(2) + speedConverter(speedUnit).suffix;
                      }
                },
                title: {
                    text: "Wind Speed",
                    style: {
                        color: "#008FFB"
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            {
                seriesName: "Cloud Average",
                opposite: true,
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#008FFB"
                },
                labels: {
                    style: {
                        colors: ["#008FFB"]
                    },
                    formatter: function (value) {
                        return value + "%";
                      }
                },
                title: {
                    text: "Cloud Average",
                    style: {
                        color: "#008FFB"
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            {
                seriesName: "Humidity",
                opposite: true,
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#008FFB"
                },
                labels: {
                    style: {
                        colors: ["#008FFB"]
                    },
                    formatter: function (value) {
                        return value + "%";
                      }
                },
                title: {
                    text: "Humidity",
                    style: {
                        color: "#008FFB"
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            {
                seriesName: "Pressure",
                opposite: true,
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#008FFB"
                },
                labels: {
                    style: {
                        colors: ["#008FFB"]
                    },
                    formatter: function (value) {
                        return value.toFixed(2) + pressureConverter(pressureUnit).suffix;
                      }
                },
                title: {
                    text: "Pressure",
                    style: {
                        color: "#008FFB"
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
           
        ],
        legend: {
            horizontalAlign: "center",
            offsetX: 40
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
                yaxis: {
                    show: false
                }
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
            <div className='mt-4'>

             <TempConverter tempUnit = {tempUnit} setTempUnit= {setTempUnit} speedUnit={speedUnit} setSpeedUnit={setSpeedUnit} setPressureUnit={setPressureUnit} pressureUnit={pressureUnit} />
            </div>
        </React.Fragment>
    );
};

export {WeatherChart}