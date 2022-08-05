import React from 'react';
import ReactApexChart from "react-apexcharts";

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

const SalesForecastCharts = ({ dataColors }) => {
    const areachartSalesColors = getChartColorsArray(dataColors);
    // const areachartSalesColors = ["#6691e7", "#13c56b", "#e8bc52"];
    const series = [{
        name: 'Goal',
        data: [37]
    }, {
        name: 'Pending Forcast',
        data: [12]
    }, {
        name: 'Revenue',
        data: [18]
    }];
    var options = {
        chart: {
            type: 'bar',
            height: 341,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '65%',
            },
        },
        stroke: {
            show: true,
            width: 5,
            colors: ['transparent']
        },
        xaxis: {
            categories: [''],
            axisTicks: {
                show: false,
                borderType: 'solid',
                color: '#78909C',
                height: 6,
                offsetX: 0,
                offsetY: 0
            },
            title: {
                text: 'Total Forecasted Value',
                offsetX: 0,
                offsetY: -30,
                style: {
                    color: '#78909C',
                    fontSize: '12px',
                    fontWeight: 400,
                },
            },
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return "$" + value + "k";
                }
            },
            tickAmount: 4,
            min: 0
        },
        fill: {
            opacity: 1
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontWeight: 500,
            offsetX: 0,
            offsetY: -14,
            itemMargin: {
                horizontal: 8,
                vertical: 0
            },
            markers: {
                width: 10,
                height: 10,
            }
        },
        colors: areachartSalesColors
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height="341"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const DealTypeCharts = ({dataColors}) => {
    const dealTypeChartsColors = getChartColorsArray(dataColors)
    // const dealTypeChartsColors = ["#e8bc52", "#ed5e5e", "#13c56b"];
    const series = [{
        name: 'Pending',
        data: [80, 50, 30, 40, 100, 20],
    },
    {
        name: 'Loss',
        data: [20, 30, 40, 80, 20, 80],
    },
    {
        name: 'Won',
        data: [44, 76, 78, 13, 43, 10],
    }
    ];
    var options = {
        chart: {
            height: 341,
            type: 'radar',
            dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
            },
            toolbar: {
                show: false
            },
        },
        stroke: {
            width: 2
        },
        fill: {
            opacity: 0.2
        },
        legend: {
            show: true,
            fontWeight: 500,
            offsetX: 0,
            offsetY: -8,
            markers: {
                width: 8,
                height: 8,
                radius: 6,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0
            }
        },
        markers: {
            size: 0
        },
        colors: dealTypeChartsColors,
        xaxis: {
            categories: ['2016', '2017', '2018', '2019', '2020', '2021']
        }
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="radar"
                height="341"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const BalanceOverviewCharts = ({timePeriod, dataColors}) => {
    const revenueExpensesChartsColors = getChartColorsArray(dataColors)
    // const revenueExpensesChartsColors = ["#13c56b", "#ed5e5e"];

    function getCostData (timePeriod) {
        switch(timePeriod) {
            case 'Today': 
                return [
                    15, 9, 4, 7, 7, 19, 15, 18, 8, 6,
                ];
            case 'Last Week': 
                return [
                    -90, -40, -20, 70, 110, 150, 180
                ];
            case 'Last Month': 
                return [
                    20, 25, -150, -90, -40, -20, 70, 110, 150, 180, 300, 360,
                    21, 22, -153
                ];
            case 'Current Year' :
                return [
                    20, 25, -150, -90, -40, -20, 70, 110, 150, 180, 300, 360,
                ];
            default:
                return "";
            
        }
    }
    function getRevenueData (timePeriod) {
        switch(timePeriod) {
            case 'Today': 
                return [
                    4, 3, 3, 6, 7, 8, 3, 6, 7, 8
                ];
            case 'Last Week': 
                return [
                    42, 52, 62, 72, 82, 92, 95
                ];
            case 'Last Month': 
                return [
                    12, 22, 32, 42, 52, 62, 72, 82, 92, 95, 96, 97,
                    13, 23, 33
                ];
            case 'Current Year' :
                return [
                    13, 23, 33, 43, 53, 63, 73, 83, 93, 96, 97, 98,
                ]
            default:
                return "";
            
        }
    }
    function getCategories (timePeriod) {
        switch(timePeriod) {
            case 'Today': 
                return [
                    '12 am', '2 am', '4 am', '6 am', '8 am', '10 am', '12 pm', '2 pm', '4 pm', '6 pm', '8 pm', '10 pm'
                ];
            case 'Last Week': 
                return [
                    'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'
                ];
            case 'Last Month': 
                return [
                    'Jul 02', 'Jul 04', 'Jul 06', 'Jul 08', 'Jul 10', 'Jul 12', 'Jul 14', 'Jul 16', 'Jul 18', 'Jul 20', 'Jul 22', 'Jul 24', 'Jul 26', 'Jul 28', 'Jul 30'
                ];
            case 'Current Year' :
                return [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ]
            default:
                return "";
            
        }
    }
    const series = [{
        name: 'Revenue',
        data: getRevenueData(timePeriod)
    }, {
        name: 'Costs',
        data: getCostData(timePeriod)
    }];
    var options = {
        chart: {
            height: 290,
            type: 'area',
            toolbar: 'false',
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: getCategories(timePeriod)
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return "$" + value + "k";
                }
            },
            tickAmount: 5,
            min: -200,
            max: 400
        },
        colors: revenueExpensesChartsColors,
        fill: {
            opacity: 0.06,
            colors: revenueExpensesChartsColors,
            type: 'solid'
        }
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

export { SalesForecastCharts, DealTypeCharts, BalanceOverviewCharts };