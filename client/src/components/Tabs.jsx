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
      <span className="md:tabs hidden">
        <a
          className={`tab tab-lifted transition ${
            activeTab === TABLE ? "tab-active tab-md" : ""
          }`}
          onClick={() => handleActiveTab(TABLE)}
        >
          Table
        </a>
        <a
          className={`tab tab-lifted transition ${
            activeTab === CHARTS ? "tab-active tab-md" : ""
          }`}
          onClick={() => handleActiveTab(CHARTS)}
        >
          Charts
        </a>
      </span>
      <span className="md:hidden dropdown dropdown-bottom ">
        <label
          tabindex="0"
          class="btn mx-1 my-0 bg-transparent border-transparent hover:bg-transparent rounded-full hover:border-transparent p-4 flex items-center justify-center"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu size={24} color="rgb(107 114 128)" />
        </label>
        {showMenu && (
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-[#1E293B]"
          >
            <li
              onClick={() => handleActiveTab(TABLE)}
              className={`${activeTab === TABLE ? "border-b-blue-500" : ""}`}
            >
              <a>Table</a>
            </li>
            <li
              onClick={() => handleActiveTab(CHARTS)}
              className={`${activeTab === CHARTS ? "border-b-blue-500" : ""}`}
            >
              <a>Charts</a>
            </li>
          </ul>
        )}
      </span>
    </>
  );
};

export default Tabs;
