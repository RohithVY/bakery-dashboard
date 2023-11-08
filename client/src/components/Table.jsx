import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/orders";
import { ErrorPage } from "../utilities/ErrorPage";
import { LoadingPage } from "../utilities/LoadingPage";
import { formatDate } from "../utilities/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { newTableData, selectDateRange } from "../app/ordersReducer";
import Pagination from "../utilities/Pagination";

const tableHeaderCName =
  "text-center font-bold text-[0.8rem] uppercase subpixel-antialiased text-slate-300";

const Table = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const tableRowsPerPage = 10;
  const [paginatedData, setPaginatedData] = useState([]);
  const pageFirstIndex = (currentPage - 1) * tableRowsPerPage;
  const dateRange = useSelector(selectDateRange);
  const { data, status, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

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
      setPaginatedData(
        data.orders.slice(pageFirstIndex, pageFirstIndex + tableRowsPerPage)
      );
    }
  }, [data, currentPage]);

  if (status === "pending") {
    return <LoadingPage />;
  }

  if (status === "error") {
    return (
      <ErrorPage msg={"There seems to be some Error! Please try again..."} />
    );
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (data && data.orders) dispatch(newTableData(data));

  return (
    <>
      <div className="overflow-x-auto mt-5 mx-5 relative">
        <table className="table bg-[#1E293B]">
          <caption class="caption-top text-[#3e4e68] mb-2">{info}</caption>
          <thead>
            <tr className="border-b-2 border-[#0F1729]">
              <th></th>
              <th className={tableHeaderCName}>Customer Name</th>
              <th className={tableHeaderCName}>Item Name</th>
              <th className={tableHeaderCName}> Branch</th>
              <th className={tableHeaderCName}>Order Status</th>
              <th className={tableHeaderCName}>Ordered Date</th>
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
        {/* currentPage, totalPages, onPageChange */}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={parseInt(data.total / tableRowsPerPage) + 1}
        onPageChange={handlePageChange}
        total={data.total}
      />
    </>
  );
};

export default Table;
