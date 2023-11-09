import React, { useState } from "react";
import TimeSeries from "./dataCharts/TimeSeries";
import { ITEMTYPE, ORDERS, ORDERSTATE, PRICES } from "../constants/constants";
import BarChart from "./dataCharts/BarChart";
import {
  getItemStats,
  getStateStats,
  getTopBranches,
} from "./charts/chartData";
import { selectTableData } from "../app/ordersReducer";
import { useSelector } from "react-redux";
import PieDataChart from "./dataCharts/TopContributors";
import TopContributors from "./dataCharts/TopContributors";
import ChartsHeader from "./ChartsHeader";

const Charts = () => {
  const allData = useSelector(selectTableData);
  const [item, setItem] = useState("Muffins");
  const [progess, setProgress] = useState("Delivered");
  const ordersProgressData = getStateStats(allData, progess);
  const orderItemStats = getItemStats(allData, item);
  const topContributorsData = getTopBranches(allData, 5);

  return (
    <div className="-z-1 relative">
      <div className="flex flex-col lg:flex-row mx-5 gap-5">
        <ChartsHeader top={topContributorsData[1]} />
        <TopContributors data={topContributorsData} />
      </div>
      <div className="flex flex-col md:flex-row mx-5 gap-5">
        <TimeSeries chartFor={ORDERS} />
        <TimeSeries chartFor={PRICES} />
      </div>
      <div className="flex flex-col md:flex-row mx-5 gap-5">
        <BarChart
          chartFor={ITEMTYPE}
          orderStats={orderItemStats}
          item={item}
          progess={progess}
          setItem={setItem}
          setProgress={setProgress}
        />
        <BarChart
          chartFor={ORDERSTATE}
          orderStats={ordersProgressData}
          item={item}
          progess={progess}
          setItem={setItem}
          setProgress={setProgress}
        />
      </div>
    </div>
  );
};

export default Charts;
