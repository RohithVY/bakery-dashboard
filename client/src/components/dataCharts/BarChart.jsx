import React, { useEffect, useId, useState } from "react";
import { barChartOptions } from "../charts/chartsConfig";
import ColumnChart from "../charts/BarChart";
import { weekdayNames, monthNames } from "../charts/chartData";
import { ITEMTYPE, ORDERSTATE } from "../../constants/constants";
import { getDailySortedData } from "../../utilities/helperFunctions";

const BarChart = ({
  chartFor,
  orderStats,
  progess,
  item,
  setItem,
  setProgress,
}) => {
  const [range, setRange] = useState(7);

  const [orderBy, setOrderBy] = useState("weekdays");
  const [keysYaxis, setKeysYaxis] = useState(weekdayNames);
  const [valuesYaxis, setValuesYaxis] = useState();

  const possibleProgresses = [
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const possibleItems = ["Cake", "Cookies", "Muffins"];

  const handleAxisValues = (keys, check = "itemType") => {
    const values = [];
    keys.forEach((elem) => values.push(orderStats[check][elem]));
    return values;
  };

  const handleFetchingValues = async (orderBy) => {
    if (orderBy === "daily") {
      const data = getDailySortedData(orderStats[orderBy]);
      setKeysYaxis(data.keys.slice(0, range));
      setValuesYaxis(data.values.slice(0, range));
    } else if (orderBy === "weekdays") {
      setKeysYaxis(weekdayNames);
      setValuesYaxis(handleAxisValues(weekdayNames, orderBy));
    } else if (orderBy === "months") {
      setKeysYaxis(monthNames);
      setValuesYaxis(handleAxisValues(monthNames, orderBy));
    } else {
      const hours = Object.keys(orderStats[orderBy])
        .map((num) => parseInt(num))
        .sort((a, b) => a - b);
      const formattedHours = hours.map((each) => `${each}:00`);
      setKeysYaxis(formattedHours);
      setValuesYaxis(handleAxisValues(hours, orderBy));
    }
  };

  const handleOrderBy = (changableOrder, orderType) => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    orderType === ORDERSTATE
      ? setOrderBy(changableOrder)
      : possibleItems.includes(changableOrder)
      ? setItem(changableOrder)
      : setProgress(changableOrder);
  };

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  const barChartDataTotalSpent = [
    {
      name:
        chartFor === ORDERSTATE
          ? "Orders Progress"
          : "Items ordered per time period",
      data: valuesYaxis,
    },
  ];

  const message =
    chartFor === ITEMTYPE
      ? `${item} orders made in Time Period`
      : `${progess} overall status`;

  const yAxisTitle = `Quantity of orders`;

  useEffect(() => {
    handleFetchingValues(orderBy);
  }, [orderBy, range, item, progess]);

  return (
    <div className="card md:w-[50%] w-full shadow-xl mt-5 bg-[#1E293B]">
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
            <li onClick={() => handleOrderBy("hourly", ORDERSTATE)}>
              <a>Hourly</a>
            </li>
            <li onClick={() => handleOrderBy("daily", ORDERSTATE)}>
              <a>Daily</a>
            </li>
            <li onClick={() => handleOrderBy("weekdays", ORDERSTATE)}>
              <a>Weekly</a>
            </li>{" "}
            <li onClick={() => handleOrderBy("months", ORDERSTATE)}>
              <a>Monthly</a>
            </li>
            {/* <li onClick={() => handleOrderBy("yearly", ORDERSTATE)}>
              <a>Yearly</a>
            </li> */}
          </ul>
        </div>
        <div className="dropdown dropdown-start mt-2 mx-2">
          <label
            tabIndex={0}
            className="btn m-1 hover:bg-[#618ad1] rounded-box w-52hover:border-transparent whitespace-nowrap"
          >
            Item Type
          </label>
          <ul
            tabIndex={0}
            className={`dropdown-content z-[1] menu p-2 shadow bg-[#2b4063] rounded-box w-52`}
          >
            {(chartFor === ITEMTYPE ? possibleItems : possibleProgresses).map(
              (item) => {
                const id = useId();
                return (
                  <li onClick={() => handleOrderBy(item, ITEMTYPE)} key={id}>
                    <a>{item}</a>
                  </li>
                );
              }
            )}
          </ul>
        </div>
        {orderBy && <input
          type="range"
          min={0}
          max={Object.keys(orderStats["daily"]).length}
          disabled={orderBy !== "daily"}
          value={range}
          onChange={(e) => handleRangeChange(e)}
          className={`range mx-4 range-sm ${
            orderBy === "daily" ? "range-secondary" : ""
          }`}
        />}
      </div>
      {console.log(keysYaxis)}
      <div className="px-5 mb-2 h-[15rem]">
        <ColumnChart
          chartData={barChartDataTotalSpent}
          chartOptions={barChartOptions(
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

export default BarChart;
