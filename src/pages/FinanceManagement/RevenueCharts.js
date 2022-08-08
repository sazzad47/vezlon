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

const RevenueCharts = ({ timePeriod, dataColors }) => {
  const linechartcustomerColors = getChartColorsArray(dataColors);

  function getData(timePeriod) {
    switch (timePeriod) {
      case "ALL":
        return {
          orders: [987, 944, 966, 876, 874, 998, 938],
          earnings: [889.25, 984.58, 648.74, 858.87, 774.54, 843.03, 515.24],
          refunds: [85, 54, 75, 54, 45, 66, 55],
          categories: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        };
      case "1M":
        return {
          orders: [12, 22, 32, 42, 52, 62, 72, 82, 92, 95, 96, 97, 13, 23, 33],
          earnings: [
            12.25, 23.58, 13.74, 22.87, 14.54, 12.03, 32.24, 12.25, 9.58, 6.74,
            21.87, 17.54, 31.03, 20.24, 21.24,
          ],
          refunds: [2, 6, 5, 4, 9, 6, 7, 3, 5, 6, 6, 7, 7, 6, 4],
          categories: [
            "Jul 02",
            "Jul 04",
            "Jul 06",
            "Jul 08",
            "Jul 10",
            "Jul 12",
            "Jul 14",
            "Jul 16",
            "Jul 18",
            "Jul 20",
            "Jul 22",
            "Jul 24",
            "Jul 26",
            "Jul 28",
            "Jul 30",
          ],
        };
      case "6M":
        return {
          orders: [124, 223, 323, 422, 521, 623],
          earnings: [89.25, 94.58, 68.74, 88.87, 74.54, 83.03],
          refunds: [12, 22, 32, 42, 52, 62],
          categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        };
      case "1Y":
        return {
          orders: [124, 223, 323, 422, 521, 623, 124, 223, 323, 422, 521, 623],
          earnings: [
            89.25, 94.58, 68.74, 88.87, 74.54, 83.03, 89.25, 94.58, 68.74,
            88.87, 74.54, 83.03,
          ],
          refunds: [12, 22, 32, 42, 52, 62, 12, 22, 32, 42, 52, 62],
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        };
      default:
        return "";
    }
  }

  const series = [
    {
      name: "Orders",
      type: "area",
      data: getData(timePeriod).orders,
    },
    {
      name: "Earnings",
      type: "bar",
      data: getData(timePeriod).earnings,
    },
    {
      name: "Refunds",
      type: "line",
      data: getData(timePeriod).refunds,
    },
  ];
  var options = {
    chart: {
      height: 370,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      dashArray: [0, 0, 8],
      width: [2, 0, 2.2],
    },
    fill: {
      opacity: [0.1, 0.9, 1],
    },
    markers: {
      size: [0, 0, 0],
      strokeWidth: 2,
      hover: {
        size: 4,
      },
    },
    xaxis: {
      categories: getData(timePeriod).categories,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 0,
        right: -2,
        bottom: 15,
        left: 10,
      },
    },
    legend: {
      show: true,
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: -5,
      markers: {
        width: 9,
        height: 9,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        barHeight: "70%",
      },
    },
    colors: linechartcustomerColors,
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return "$" + y.toFixed(2) + "k";
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " Sales";
            }
            return y;
          },
        },
      ],
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="370"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { RevenueCharts };
