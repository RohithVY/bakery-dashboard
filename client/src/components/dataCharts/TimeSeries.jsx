import React, { useEffect, useState } from "react";
import LineChart from "../charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import { selectTableData } from "../../app/ordersReducer";
import { getOrderStats, monthNames, weekdayNames } from "../charts/chartData";
import { lineChartOptionsTotalSpent } from "../charts/chartsConfig";
import { getDailySortedData } from "../../utilities/helperFunctions";
import { ORDERS } from "../../constants/constants";

const TimeSeries = ({ chartFor }) => {
  const allData = useSelector(selectTableData);
  const orderStats = getOrderStats(allData);
  const [range, setRange] = useState(7);
  const [orderBy, setOrderBy] = useState("weekdays");
  const [keysYaxis, setKeysYaxis] = useState(weekdayNames);
  const [valuesYaxis, setValuesYaxis] = useState();

  const handleAxisValues = (keys, check = ORDERS) => {
    const values = [];
    keys.forEach((elem) => values.push(orderStats[check][elem]));
    return values;
  };

  const handleFetchingValues = (orderBy) => {
    if (orderBy === "daily") {
      const check = chartFor === ORDERS ? orderBy : "dailyTotalPrices";
      const data = getDailySortedData(orderStats[check]);
      setKeysYaxis(data.keys.slice(0, range));
      setValuesYaxis(data.values.slice(0, range));
    } else if (orderBy === "weekdays") {
      const check = chartFor === ORDERS ? orderBy : "weekdayTotalPrices";

      setKeysYaxis(weekdayNames);
      setValuesYaxis(handleAxisValues(weekdayNames, check));
    } else if (orderBy === "months") {
      const check = chartFor === ORDERS ? orderBy : "monthTotalPrices";

      setKeysYaxis(monthNames);
      setValuesYaxis(handleAxisValues(monthNames, check));
    } else {
      const check = chartFor === ORDERS ? orderBy : "hourlyTotalPrices";
      const hours = Object.keys(orderStats[check])
        .map((num) => parseInt(num))
        .sort((a, b) => a - b);
      const formattedHours = hours.map((each) => `${each}:00`);

      setKeysYaxis(formattedHours);
      setValuesYaxis(handleAxisValues(hours, check));
    }
  };

  const handleOrderBy = (changableOrder) => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    setOrderBy(changableOrder);
  };

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  const lineChartDataTotalSpent = [
    {
      name: chartFor === ORDERS ? "Orders Made" : "Revenue Made",
      data: valuesYaxis,
    },
  ];

  const message =
    chartFor === ORDERS
      ? `Orders made in Time Period`
      : `Totol Revenuse earned in Time Period`;

  const yAxisTitle =
    chartFor === ORDERS ? `Count of Orders` : `Revenue in Rupees`;

  useEffect(() => {
    handleFetchingValues(orderBy);
  }, [orderBy, range]);

  return (
    <div className="card md:w-[50%] w-full shadow-xl mt-5 transition-none bg-[#1E293B]">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="dropdown dropdown-start mt-2 mx-2">
          <label
            tabIndex={0}
            className="btn m-1 hover:bg-[#618ad1] rounded-box w-52hover:border-transparent whitespace-nowrap"
          >
            Order By
          </label>
          <ul
            tabIndex={0}
            className={`dropdown-content z-[1] menu p-2 shadow bg-[#2b4063] rounded-box w-52`}
          >
            <li onClick={() => handleOrderBy("hourly")}>
              <a>Hourly</a>
            </li>
            <li onClick={() => handleOrderBy("daily")}>
              <a>Daily</a>
            </li>
            <li onClick={() => handleOrderBy("weekdays")}>
              <a>Weekly</a>
            </li>{" "}
            <li onClick={() => handleOrderBy("months")}>
              <a>Monthly</a>
            </li>
            {/* <li onClick={() => handleOrderBy("yearly")}>
              <a>Yearly</a>
            </li> */}
          </ul>
        </div>
        <input
          type="range"
          min={0}
          max={Object.keys(orderStats["daily"]).length}
          disabled={orderBy !== "daily"}
          value={range}
          onChange={(e) => handleRangeChange(e)}
          className={`range mx-4 range-sm ${
            orderBy === "daily" ? "range-secondary" : ""
          }`}
        />
      </div>
      <div className="px-5 mb-2 h-[15rem]">
        <LineChart
          chartData={lineChartDataTotalSpent}
          chartOptions={lineChartOptionsTotalSpent(
            keysYaxis,
            message,
            orderBy,
            yAxisTitle
          )}
        />
      </div>
    </div>
  );
};

export default TimeSeries;
