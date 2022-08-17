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

const WeatherChart = ({pause, dataColors }) => {

  const [timezone, setTimezone] = useState();
  const [days, setDays] = useState([]);
  const [maxTemps, setMaxTemps] = useState([]);
  const [minTemps, setMinTemps] = useState([]);
  const [windSpeeds, setWindSpeeds] = useState([]);
  const [cloudCoverage, setCloudCoverage] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [pressure, setPressure] = useState([]);
  
  const [loading, setLoading] = useState(true);
  
    

    const fetchData = () => {
      fetch("https://api.wheretheiss.at/v1/satellites/25544")
        .then((response) => response.json())
        .then((data) => {
          console.log('fetchData', data);
          // const parser = new DOMParser();
          // const xml = parser.parseFromString(data, "application/xml");
          
          // let latitude = data.latitude
          // let longitude = data.longitude
          let coordinates = [data.latitude, data.longitude]
          // let positionArray = [parseFloat(xml.all[5].textContent).toFixed(2), parseFloat(xml.all[6].textContent).toFixed(2)];
          fetchWeather(coordinates);
        })
        .catch(console.error);
    }
    
   
    const fetchWeather = (coordinates) => {
      
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=783846624ca63c9a9fcdd9321a7c9318&exclude=minutely&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          let timezone = data.timezone;
          let days = data.daily.map((day) => {
           return moment.unix(day.dt).tz(timezone).format("MMM Do YY");
           })
          let maxTemps = data.daily.map((data) => {
           return data.temp.max;
           })
          let minTemps = data.daily.map((data) => {
           return data.temp.min;
           })
          let windSpeeds = data.daily.map((data) => {
           return data.wind_speed;
           })
          let cloudCoverage = data.daily.map((data) => {
           return data.clouds;
           })
          let humidity = data.daily.map((data) => {
           return data.humidity;
           })
          let pressure = data.daily.map((data) => {
           return data.pressure;
           })
          
          setTimezone(timezone);
          setDays(days);
          setMaxTemps(maxTemps);
          setMinTemps(minTemps);
          setWindSpeeds(windSpeeds);
          setCloudCoverage(cloudCoverage);
          setHumidity(humidity);
          setPressure(pressure);
          setLoading(false);
          });
    }
          

    useEffect(() => {
      
      fetchData();
    }, [])


     
    
   
    
    // const days = weeklyWeather?.map((day) => {
    //     return moment.unix(day.dt).tz(timezone).format("MMM Do YY");
    // })
    
    const [tempUnit, setTempUnit] = useState();
    const [speedUnit, setSpeedUnit] = useState();
    const [pressureUnit, setPressureUnit] = useState();
   
    const maxTempConverter = (tempUnit) => {
      
        switch(tempUnit) {
            case 'Kelvin':
                
                return {data: maxTemps?.map((maxTemp) => 
                    maxTemp + 273.15
                    
                ), suffix: ' K'};
            case 'Celsius':
                return {data: maxTemps?.map((maxTemp) =>
                    maxTemp
                    
                ), suffix: ' °C'};
                
                
            case 'Fahrenheit':
                return {data: maxTemps?.map((maxTemp) => 
                    maxTemp * (9 / 5) + 32
                    
               ), suffix: ' °F'};
                default:
                    return {data: maxTemps?.map((maxTemp) =>
                        maxTemp
                        
                    ), suffix: ' °C'};
        }
      
    }
           const maxTempData = maxTempConverter(tempUnit).data
   
            const minTempConverter = (tempUnit) => {
                switch(tempUnit) {
                    case 'Kelvin':
                        
                        return {data:  minTemps.map((minTemp) => 
                            minTemp + 273.15
                            
                        ), suffix:' K'};
                    case 'Celsius':
                        return {data: minTemps.map((minTemp) =>
                            minTemp
                            
                        ), suffix: ' °C'};
                        
                        
                    case 'Fahrenheit':
                        return {data: minTemps.map((minTemp) => 
                            minTemp * (9 / 5) + 32
                            
                    ), suffix: ' °F'};
                        default:
                            return {data: minTemps.map((minTemp) =>
                                minTemp
                                
                            ), suffix: ' °C'};
                }
            }
            const speedConverter = (speedUnit) => {
                switch(speedUnit) {
                    case 'Miles per hour':
                        
                        return {data: windSpeeds.map((windSpeed) => 
                            windSpeed * 2.236936
                            
                        ), suffix:' mph'};
                    case 'Meter per second':
                        return {data: windSpeeds.map((windSpeed) => 
                            windSpeed 
                            
                        ), suffix:' mps'};
                        
                        
                    case 'Kilometer per hour':
                        return {data: windSpeeds.map((windSpeed) => 
                            windSpeed * 3.6
                            
                        ), suffix:' kph'};
                        default:
                            return {data: windSpeeds.map((windSpeed) => 
                                windSpeed 
                                
                            ), suffix:' mps'};
                }
            }
            const pressureConverter = (pressureUnit) => {
                switch(pressureUnit) {
                    case 'Hectopascal':
                        
                        return {data: pressure.map((pressure) => 
                            pressure
                            
                        ), suffix:' hpa'};
                    case 'Pascal':
                        return {data: pressure.map((pressure) => 
                            pressure * 100
                            
                        ), suffix:' pa'};
                        
                        
                    case 'Standard atmosphere':
                        return {data: pressure.map((pressure) => 
                            pressure * 0.000987
                            
                        ), suffix:' atm'};
                        default:
                            return {data: pressure.map((pressure) => 
                                pressure
                                
                            ), suffix:' hpa'};
                }
            }
   
   
    

    useEffect(() => {
      maxTempConverter(tempUnit);
      minTempConverter(tempUnit);
      speedConverter(speedUnit);
    }, [tempUnit, speedUnit])
    
    
   
    
    // const linechartcustomerColors = getChartColorsArray(dataColors)

    var series = [{
      name: 'Max Temp',
      type: 'line',
      data: maxTempConverter(tempUnit).data
    }, 
    {
      name: 'Min Temp',
      type: 'line',
      data: minTempConverter(tempUnit).data
    }, 
    {
      name: 'Wind Speed',
      type: 'line',
      data: speedConverter(speedUnit).data
    },
    {
      name: 'Humidity',
      type: 'line',
      data: humidity
    },
    {
      name: 'Cloud Coverage',
      type: 'line',
      data: cloudCoverage
    },
    {
      name: 'Pressure',
      type: 'line',
      data:  pressureConverter(pressureUnit).data
    },
  ]

    var options = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      data: {
        tempData: maxTempConverter(tempUnit).data,
        speedData: speedConverter(speedUnit).data,
        pressureData: pressureConverter(pressureUnit).data
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: 'ISS Weather Data',
        align: 'left',
        style: {
            fontWeight: 500,
         },
      },
      xaxis: {
        categories: days,
        tickPlacement: 'between',
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
            formatter: function (value) {
              return value + maxTempConverter(tempUnit).suffix;
            }
           
          },
          title: {
            text: "Max Temp",
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: 'Min Temp',
         
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396',
            },
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(1) + minTempConverter(tempUnit).suffix;
              }
              return y;
            },
          },
          title: {
            text: "Min Temp",
            style: {
              color: '#00E396',
            }
          },
        },
        {
          seriesName: 'Wind Speed',
         
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(1) + speedConverter(speedUnit).suffix;
              }
              return y;
            },
          },
          title: {
            text: "Wind Speed",
            style: {
              color: '#FEB019',
            }
          }
        },
        {
          seriesName: 'Humidiy',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(1) + ' %';
              }
              return y;
            },
          },
          title: {
            text: "Humidity",
            style: {
              color: '#FEB019',
            }
          }
        },
        {
          seriesName: 'Cloud Coverage',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(1) + ' %';
              }
              return y;
            },
          },
          title: {
            text: "Cloud Coverage",
            style: {
              color: '#FEB019',
            }
          }
        },
        {
          seriesName: 'Pressure',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(1) + pressureConverter(pressureUnit).suffix;
              }
              return y;
            },
          },
          title: {
            text: "Pressure",
            style: {
              color: '#FEB019',
            }
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft',
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'center',
        offsetX: 40
      }
    }
   
    // var series = [
    //     {
    //         name: "Max Temp",
    //         type: "line",
    //         data: maxTempConverter(tempUnit).data.toFixed(1)
    //     },
    //     {
    //         name: "Min Temp",
    //         type: "line",
    //         data: minTempConverter(tempUnit).data.toFixed(1)
    //     },
    //     {
    //         name: "Wind Speed",
    //         type: "line",
    //         data: speedConverter(speedUnit).data.toFixed(1)
    //     },
    //     {
    //         name: "Cloud Coverage",
    //         type: "line",
    //         data: cloudCoverage
    //     },
    //     {
    //         name: "Humidity",
    //         type: "line",
    //         data: humidity
    //     },
    //     {
    //         name: "Pressure",
    //         type: "line",
    //         data: pressureConverter(pressureUnit).data.toFixed(1)
    //     },
       
    // ]

    // var options = {
        
    //     chart: {
    //   height: 370,
    //   type: "line",
    //   toolbar: {
    //     show: false,
    //   },
    // },
    // stroke: {
    //   curve: "straight",
    //   dashArray: [0, 0, 8],
    //   width: [2, 0, 2.2],
    // },
    // fill: {
    //   opacity: [0.1, 0.9, 1],
    // },
    // markers: {
    //   size: [0, 0, 0],
    //   strokeWidth: 2,
    //   hover: {
    //     size: 4,
    //   },
    // },
    //     title: {
    //     text: 'Weather Forecast',
    //     align: 'left',
    //     style: {
    //         fontWeight: 500,
    //      },
    //     },
    //     xaxis: {
    //         categories: days,
    //         axisTicks: {
    //             show: false,
    //           },
    //           axisBorder: {
    //             show: false,
    //           },
    //     },
    //     grid: {
    //         show: true,
    //         xaxis: {
    //           lines: {
    //             show: true,
    //           },
    //         },
    //         yaxis: {
    //           lines: {
    //             show: false,
    //           },
    //           min: -1000
    //         },
    //         padding: {
    //           top: 0,
    //           right: -2,
    //           bottom: 15,
    //           left: 10,
    //         },
    //       },
    //       legend: {
    //         show: true,
    //         horizontalAlign: "center",
    //         offsetX: 0,
    //         offsetY: -5,
    //         markers: {
    //           width: 9,
    //           height: 9,
    //           radius: 6,
    //         },
    //         itemMargin: {
    //           horizontal: 10,
    //           vertical: 0,
    //         },
    //       },
    //       plotOptions: {
    //         bar: {
    //           columnWidth: "30%",
    //           barHeight: "70%",
    //         },
    //       },
    //       colors: linechartcustomerColors,
    //     tooltip: {
    //         shared: true,
    //         y: [
    //           {
    //             formatter: function (y) {
    //               if (typeof y !== "undefined") {
    //                 return y.toFixed(1) + maxTempConverter(tempUnit).suffix;
    //               }
    //               return y;
    //             },
    //           },
    //           {
    //             formatter: function (y) {
    //               if (typeof y !== "undefined") {
    //                 return "$" + y.toFixed(1) + minTempConverter(tempUnit).suffix;
    //               }
    //               return y;
    //             },
    //           },
    //           {
    //             formatter: function (y) {
    //               if (typeof y !== "undefined") {
    //                 return y.toFixed(1) + speedConverter(speedUnit).suffix;
    //               }
    //               return y;
    //             },
    //           },
    //           {
    //             formatter: function (y) {
    //               if (typeof y !== "undefined") {
    //                 return y.toFixed(0) + " %";
    //               }
    //               return y;
    //             },
    //           },
    //           {
    //             formatter: function (y) {
    //               if (typeof y !== "undefined") {
    //                 return y.toFixed(0) + " %";
    //               }
    //               return y;
    //             },
    //           },
    //           {
    //             formatter: function (y) {
    //               if (typeof y !== "undefined") {
    //                 return y.toFixed(0) + pressureConverter(pressureUnit).suffix;
    //               }
    //               return y;
    //             },
    //           },
    //         ],
    //       },
       
    //         responsive: [{
    //         breakpoint: 600,
    //         options: {
    //             chart: {
    //                 toolbar: {
    //                     show: false
    //                 }
    //             },
    //             legend: {
    //                 show: false
    //             },
               
    //         }
    //     }]
    // };
   
    return (
        <React.Fragment>
         
             <ReactApexChart
                
                options={options}
                series={series}
                type="line"
                height="370"
                className="apex-charts"
            />
           <div className='mt-4'>

          <TempConverter tempUnit = {tempUnit} setTempUnit= {setTempUnit} speedUnit={speedUnit} setSpeedUnit={setSpeedUnit} setPressureUnit={setPressureUnit} pressureUnit={pressureUnit} />
           </div>
            
        </React.Fragment>
    );
};

export {WeatherChart}