import React from "react";
import ReactApexChart from "react-apexcharts";
import ColumnChart from "../charts/BarChart";

const TopContributors = ({ data }) => {
  const series = [
    {
      name: "",
      data: [27220, 20800, 20630, 19720, 15160],
    },
  ];
  const options = {
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
      text: "Our Top 5 Contributors",
      align: "center",
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
      categories: data.map((each) => `Branch ${each.branch}`),
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
        text: "Branch Names",
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
        text: "Orders delivered this year",
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
  return (
    <div className="card lg:w-[50%] w-full shadow-xl mt-5 bg-[#1E293B] -z-1">
      <div className="px-5 pt-3 pb-2 h-[15rem]">
        <ColumnChart chartData={series} chartOptions={options} />
      </div>
    </div>
  );
};

export default TopContributors;
