import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
// @ts-ignore
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { dataPoints } from "./data";

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

const ISSData = ({ setLatitude, setLongitude, dataColors }) => {
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
          humanDateFormat,
          unixTimestamp,
          visibility,
          lat,
          // @ts-ignore
          long,
          // @ts-ignore
          // @ts-ignore
          speed,
          // @ts-ignore
          altitude,
          // @ts-ignore
          // @ts-ignore
          solar_lat,
          // @ts-ignore
          solar_lon,
          // @ts-ignore
        ]);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setLoading(false);
        // calculateRadius(altitude);
        // calculateRadius20degrees(altitude);
        // prepareArray(altitude);
        // prepareDynamicMatrix(humanDateFormatUTC, speed, altitude, lat, long);
        // Adding a 6 seconds delay to drawISS3D function
        //   setTimeout(function () {
        //     drawISS3D(lat, long, altitude);
        //   }, 6000);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  const speed = data[3];
  const altitude = data[4];
  const visibility = data[5];
  const solarLat = data[6];
  const solarLong = data[7];
  React.useEffect(() => {}, [data]);
  const seriesData = data.slice(3, 9);
  console.log("data", seriesData);

  var linechartBasicColors = getChartColorsArray(dataColors);
  const series = [
    {
      data: seriesData,
      // data: [lat, long, speed, altitude, visibility, solarLat, solarLong]
    },
  ];
  var options = {
    chart: {
      height: 180,
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
      text: "ISS Data",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },

    xaxis: {
      categories: [
        "Latitude",
        "Longitude",
        "Speed",
        "Altitude",
        "Solar Latitude",
        "Solar Longitude",
      ],
    },
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between">
        <span>
          <span>Date:</span>
          <span className="mx-1">{data[0]}</span>
        </span>
        <span>
          <span>Timestamp:</span>
          <span className="mx-1">{data[1]}</span>
        </span>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="180"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default ISSData;
