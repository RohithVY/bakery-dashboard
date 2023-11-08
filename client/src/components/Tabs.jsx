import React, { useState } from "react";
import { Menu } from "lucide-react";
import { TABLE, CHARTS } from "../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveTab, updateActiveTab } from "../app/ordersReducer";

const Tabs = () => {
  //   const [activeTab, setActiveTab] = useState(TABLE);
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const [showMenu, setShowMenu] = useState(false);
  const handleActiveTab = (val) => {
    dispatch(updateActiveTab(val));
    setShowMenu(false);
  };
  return (
    <>
      {" "}
      <span className="md:tabs tabs-boxed">
        <a
          className={`tab transition ${
            activeTab === TABLE ? "tab-active tab-md" : ""
          }`}
          onClick={() => handleActiveTab(TABLE)}
        >
          Table
        </a>
        <a
          className={`tab transition ${
            activeTab === CHARTS ? "tab-active tab-md" : ""
          }`}
          onClick={() => handleActiveTab(CHARTS)}
        >
          Charts
        </a>
      </span>
    </>
  );
};

export default Tabs;
