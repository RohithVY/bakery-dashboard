import React from "react";
import LineChart from "../charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import { selectTableData } from "../../app/ordersReducer";
import { getItemStats, getOrderStats, getStateStats, getTopBranches } from "../charts/chartData";
import { lineChartOptionsTotalSpent } from "../charts/chartsConfig";

export const lineChartDataTotalSpent = [
  {
    name: "REVENUE",
    data: [50, 64, 48, 66, 49, 68],
  },
  {
    name: "PROFIT",
    data: [30, 40, 24, 46, 20, 46],
  },
];
// https://codesandbox.io/s/crazy-cartwright-973v74?file=/src/variables/charts.js:4351-5563
const TimeSeries = () => {
  const allData = useSelector(selectTableData);
  const orderStats = getTopBranches(allData?.orders);
  
  return (
    <div className="card w-[30%] shadow-xl mt-5 mx-5 bg-[#1E293B]">
      <div className="px-5 mb-2">
        <LineChart
          chartData={lineChartDataTotalSpent}
          chartOptions={lineChartOptionsTotalSpent}
        />
      </div>
    </div>
  );
};

export default TimeSeries;
