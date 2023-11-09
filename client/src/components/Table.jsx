import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/orders";
import { ErrorPage } from "../utilities/ErrorPage";
import { LoadingPage } from "../utilities/LoadingPage";
import {
  filterData,
  formatDate,
  handleSortedData,
} from "../utilities/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { newTableData, selectDateRange } from "../app/ordersReducer";
import Pagination from "../utilities/Pagination";
import { ASC, DSC } from "../constants/constants";

const tableHeaderCName =
  "text-center font-bold text-[0.8rem] uppercase subpixel-antialiased text-slate-300 cursor-pointer";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const tableRowsPerPage = 10;
  const [paginatedData, setPaginatedData] = useState([]);
  const pageFirstIndex = (currentPage - 1) * tableRowsPerPage;
  const dateRange = useSelector(selectDateRange);
  const { data, status, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const [filteredData, setFilteredData] = useState([]);
  const [dataDirections, setDataDirection] = useState({
    item_type: ASC,
    order_state: ASC,
    last_update_time: DSC,
    branch: ASC,
    customer: ASC,
  });

  const dispatch = useDispatch();

  const startDate = new Date(dateRange.startDate);
  const endDate = new Date(dateRange.endDate);

  const info = dateRange.startDate
    ? `Info: Data of orders made from ${formatDate(
        new Date(Math.min(startDate.getTime(), endDate.getTime())).toISOString()
      )} to ${formatDate(
        new Date(Math.max(startDate.getTime(), endDate.getTime())).toISOString()
      )}`
    : ``;

  useEffect(() => {
    if (data && data.orders) {
      setFilteredData(data.orders);
      dispatch(newTableData(data.orders));
    }
  }, [data]);

  useEffect(() => {
    if (filteredData) {
      setPaginatedData(
        filteredData.slice(pageFirstIndex, pageFirstIndex + tableRowsPerPage)
      );
    }
  }, [filteredData, currentPage]);

  useEffect(() => {
    data?.orders &&
      filterData(
        data?.orders,
        setFilteredData,
        "last_update_time",
        dateRange,
        dispatch
      );
  }, [dateRange]);

  if (status === "pending") {
    return <LoadingPage />;
  }

  if (status === "error" || !data?.orders?.length) {
    return (
      <ErrorPage msg={"There seems to be some Error! Please try again..."} />
    );
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleDirectionChange = (key) => {
    setDataDirection((prevState) => {
      const newDirection = prevState[key] === ASC ? DSC : ASC;
      return {
        ...prevState,
        [key]: newDirection,
      };
    });
    setTimeout(
      () =>
        handleSortedData(
          filteredData,
          setFilteredData,
          dataDirections[key],
          key
        ),
      0
    );
  };

  return (
    <>
      <div className="overflow-x-auto mt-5 mx-5 relative">
        <table className="table bg-[#1E293B]">
          <caption className="caption-top text-[#3e4e68] mb-2">{info}</caption>
          <thead>
            <tr className="border-b-2 border-[#0F1729]">
              <th></th>
              <th
                className={tableHeaderCName}
                onClick={() => {
                  handleDirectionChange("customer");
                }}
              >
                Customer Name ↕
              </th>
              <th
                className={tableHeaderCName}
                onClick={() => {
                  handleDirectionChange("item_type");
                }}
              >
                Item Name ↕
              </th>
              <th
                className={tableHeaderCName}
                onClick={() => {
                  handleDirectionChange("branch");
                }}
              >
                {" "}
                Branch ↕
              </th>
              <th
                className={tableHeaderCName}
                onClick={() => {
                  handleDirectionChange("order_state");
                }}
              >
                Order Status ↕
              </th>
              <th
                className={tableHeaderCName}
                onClick={() => {
                  handleDirectionChange("last_update_time");
                }}
              >
                Ordered Date ↕
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData &&
              paginatedData.map((each, index) => {
                return (
                  <tr
                    key={each._id}
                    className="border-b-2 border-[#0F1729] hover:bg-[#334767] cursor-pointer"
                  >
                    <th className="text-center">
                      {pageFirstIndex + index + 1}
                    </th>
                    <td className="text-center">{`Customer ${each.customer}`}</td>
                    <td className="text-center">{each.item_type}</td>
                    <td className="text-center">{`Branch ${each.branch}`}</td>
                    <td className="text-center">{each.order_state}</td>
                    <td className="text-center">
                      {formatDate(each.last_update_time)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / tableRowsPerPage)}
        onPageChange={handlePageChange}
        total={filteredData.length ? filteredData.length : data.total}
      />
    </>
  );
};

export default Table;
