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

const BalanceOverviewCharts = ({ timePeriod, dataColors }) => {
  const revenueExpensesChartsColors = getChartColorsArray(dataColors);
  // const revenueExpensesChartsColors = ["#13c56b", "#ed5e5e"];

  function getData(timePeriod) {
    switch (timePeriod) {
      case "Today":
        return {
          revenue: [4, 3, 3, 6, 7, 8, 3, 6, 7, 8],
          cost: [15, 9, 4, 7, 7, 19, 15, 18, 8, 6],
          categories: [
            "12 am",
            "2 am",
            "4 am",
            "6 am",
            "8 am",
            "10 am",
            "12 pm",
            "2 pm",
            "4 pm",
            "6 pm",
            "8 pm",
            "10 pm",
          ],
        };
      case "Last Week":
        return {
          revenue: [42, 52, 62, 72, 82, 92, 95],
          cost: [-90, -40, -20, 70, 110, 150, 180],
          categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        };
      case "Last Month":
        return {
          revenue: [12, 22, 32, 42, 52, 62, 72, 82, 92, 95, 96, 97, 13, 23, 33],
          cost: [
            20, 25, -150, -90, -40, -20, 70, 110, 150, 180, 300, 360, 21, 22,
            -153,
          ],
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
      case "Current Year":
        return {
          revenue: [13, 23, 33, 43, 53, 63, 73, 83, 93, 96, 97, 98],
          cost: [20, 25, -150, -90, -40, -20, 70, 110, 150, 180, 300, 360],
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
      name: "Revenue",
      data: getData(timePeriod).revenue,
    },
    {
      name: "Costs",
      data: getData(timePeriod).cost,
    },
  ];
  var options = {
    chart: {
      height: 290,
      type: "area",
      toolbar: "false",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: getData(timePeriod).categories,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value + "k";
        },
      },
      tickAmount: 5,
      min: -200,
      max: 400,
    },
    colors: revenueExpensesChartsColors,
    fill: {
      opacity: 0.06,
      colors: revenueExpensesChartsColors,
      type: "solid",
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="290"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { BalanceOverviewCharts };
