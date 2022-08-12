import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function getChartColorsArray(colors) {
  colors = JSON.parse(colors);
  return colors.map(function (value) {
    var newValue = value.replace(" ", "");
    if (newValue.indexOf(",") === -1) {
      var color = getComputedStyle(document.documentElement).getPropertyValue(
        newValue
      );
      if (color.indexOf("#") !== -1) color = color.replace(" ", "");
      if (color) return color;
      else return newValue;
    } else {
      var val = value.split(",");
      if (val.length === 2) {
        var rgbaColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue(val[0]);
        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
        return rgbaColor;
      } else {
        return newValue;
      }
    }
  });
}
const ISSAltitude = ({ dataColors, setLatitude, setLongitude }) => {
  const [data, setData] = useState([]);
  // @ts-ignore
  const [loading, setLoading] = useState(false);
  let lat;
  let long;

  // to call 1 time at start so the data is loaded
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to call fetch data every 10 seconds
  useEffect(() => {
    const myInterval = setInterval(fetchData, 10000);

    return () => {
      // should clear the interval when the component unmounts
      clearInterval(myInterval);
    };
  });

  const fetchData = () => {
    setLoading(true);
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => response.json())
      .then((data) => {
        lat = data.latitude.toFixed(2);
        long = data.longitude.toFixed(2);
        // Converting Unix epoch time to human-readable date and time
        const unixTimestamp = data.timestamp;
        const milliseconds = unixTimestamp * 1000;
        const dateObject = new Date(milliseconds);
        const humanDateFormatLong = dateObject.toString();
        // Changing the name of Time Zone from long to short (e.g. to CEST)
        const stringTemp1 = humanDateFormatLong.split("(");
        const stringTemp2 = stringTemp1[1].slice(0, -1);
        const stringTemp3 = stringTemp2.split(" ");
        let stringTemp4 = "";
        for (let i = 0; i < stringTemp3.length; i++) {
          stringTemp4 = stringTemp4 + stringTemp3[i].charAt(0);
        }
        const humanDateFormat = stringTemp1[0] + stringTemp4;
        // Generating the UTC Time
        // @ts-ignore
        const humanDateFormatUTC = dateObject.toUTCString();
        // Setting other values
        const speed = data.velocity.toFixed(2);
        const altitude = data.altitude.toFixed(2);
        const visibility = data.visibility;
        let solar_lat = data.solar_lat.toFixed(2);
        let solar_lon = data.solar_lon.toFixed(2);
        // Calibrating the position of the Sun
        if (solar_lon > 180) {
          solar_lon = solar_lon - 360;
        }
        // Adding trail of ISS
        let trajectory = [];
        trajectory.push(lat, long);
        // @ts-ignore
        let latlngs = trajectory.map((elem) => parseFloat(elem));
        setData([
          // @ts-ignore
          lat,
          // @ts-ignore
          long,
          // @ts-ignore
          humanDateFormat,
          // @ts-ignore
          speed,
          // @ts-ignore
          altitude,
          // @ts-ignore
          visibility,
          // @ts-ignore
          solar_lat,
          // @ts-ignore
          solar_lon,
          // @ts-ignore
          unixTimestamp,
        ]);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  React.useEffect(() => {}, [data]);

  const altitude = data[4];

  const [arrayAlt, setArrayAlt] = useState([]);
  

  useEffect(() => {
    const prepareArray = () => {
      setArrayAlt((oldArray) => [...oldArray, parseFloat(altitude)]);
    };

    prepareArray();
    const prepareChart = () => {
     
      if (arrayAlt.length > 4) arrayAlt.shift();
    };
    prepareChart();

    
   
  }, [altitude]);
 

  

  var linechartBasicColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Altitude",
      data: arrayAlt,
    },
  ];
  var options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: linechartBasicColors,
    title: {
      text: "ISS Altitude",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },

    xaxis: {
      categories: ["5 seconds ago",
      "4 seconds ago",
      "3 seconds ago",
      "2 seconds ago",
      "1 seconds ago"]
    },
    
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="350"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default ISSAltitude;
