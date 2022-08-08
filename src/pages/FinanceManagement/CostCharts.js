import React from "react";
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

const CostCharts = ({ timePeriod, dataColors }) => {
  const donutchartportfolioColors = getChartColorsArray(dataColors);

  function getSeries(timePeriod) {
    switch (timePeriod) {
      case "1 Month":
        return [50, 11.5, 50, 57];
      case "3 Months":
        return [150, 34.5, 150, 171];
      case "6 Months":
        return [300, 69, 300, 342];
      case "1 Year":
        return [600, 183, 600, 684];
      default:
        return "";
    }
  }

  const series = getSeries(timePeriod);
  var options = {
    labels: ["Maintenance", "Hosting", "Firebase", "Mongo"],
    chart: {
      type: "donut",
      height: 224,
    },

    plotOptions: {
      pie: {
        size: 100,
        offsetX: 0,
        offsetY: 0,
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "18px",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "20px",
              color: "#363d48",
              fontWeight: 500,
              offsetY: 5,
              formatter: function (val) {
                return "$" + val;
              },
            },
            total: {
              show: true,
              fontSize: "13px",
              label: "Total cost",
              color: "#9599ad",
              fontWeight: 500,
              formatter: function (w) {
                return (
                  "$" +
                  w.globals.seriesTotals.reduce(function (a, b) {
                    return a + b;
                  }, 0)
                );
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    stroke: {
      lineCap: "round",
      width: 2,
    },
    colors: donutchartportfolioColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="224"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { CostCharts };
