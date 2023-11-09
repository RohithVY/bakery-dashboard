export const lineChartOptionsTotalSpent = (
  yaxisKeys,
  message,
  orderBy,
  yAxisTitle
) => {
  const xAxisMessage = {
    months: `Monthly Data`,
    weekdays: `Weekly Data`,
    daily: `DayWise Data`,
    hourly: `Hourly Data`,
  };

  return {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: false,
        zoomedArea: {
          fill: {
            color: "#90CAF9",
            opacity: 0.4,
          },
          stroke: {
            color: "#0D47A1",
            opacity: 0.4,
            width: 1,
          },
        },
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    title: {
      text: message,
      align: "left",
      style: {
        fontSize: "16px",
        color: "#ffffff",
        fontFamily: "Inter",
        fontWeight: 500,
      },
    },

    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories: yaxisKeys,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      title: {
        text: xAxisMessage[orderBy],
        style: {
          fontSize: "12px",
          fontWeight: "200",
          color: "#616873",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      title: {
        text: yAxisTitle,
        style: {
          fontSize: "12px",
          fontWeight: "200",
          color: "#616873",
        },
      },
    },
    legend: {
      show: true,
      fontWeight: 400,
      fontSize: "8px",
      offsetY: 4,
      labels: {
        colors: "#A3AED0",
      },
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    color: ["#7551FF", "#39B8FF"],
  };
};

export const barChartOptions = (yaxisKeys, message, orderBy, yAxisTitle) => {
  const xAxisMessage = {
    months: `Monthly Data`,
    weekdays: `Weekly Data`,
    daily: `DayWise Data`,
    hourly: `Hourly Data`,
  };
  return {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    title: {
      text: message,
      align: "left",
      style: {
        fontSize: "16px",
        color: "#ffffff",
        fontFamily: "Inter",
        fontWeight: 500,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: "Inter",
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter",
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: yaxisKeys,
      show: true,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      title: {
        text: xAxisMessage[orderBy],
        style: {
          fontSize: "12px",
          fontWeight: "200",
          color: "#616873",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
      title: {
        text: yAxisTitle,
        style: {
          fontSize: "12px",
          fontWeight: "200",
          color: "#616873",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 0,
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#4318FF",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(67, 24, 255, 1)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
      },
    },
  };
};

export const pieChartOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
