import { ASC } from "../constants/constants";

export const formatDate = (dateString) => {
  let date = new Date(dateString);
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export const handleSortedData = (
  filteredData,
  setFilteredData,
  direction,
  key
) => {
  const isNumeric = key === "branch" || key === "customer";
  const isDate = key === "last_update_time";

  if (direction === ASC) {
    setFilteredData(
      [...filteredData].sort((a, b) => {
        if (isDate) {
          return new Date(a[key]) - new Date(b[key]);
        } else {
          return (a[key]?.toString() || "").localeCompare(
            b[key]?.toString() || "",
            "en",
            {
              numeric: isNumeric,
            }
          );
        }
      })
    );
  } else {
    setFilteredData(
      [...filteredData].sort((a, b) => {
        if (isDate) {
          return new Date(b[key]) - new Date(a[key]);
        } else {
          return (b[key]?.toString() || "").localeCompare(
            a[key]?.toString() || "",
            "en",
            {
              numeric: isNumeric,
            }
          );
        }
      })
    );
  }
};

export const filterData = async (
  filterableData,
  setFilteredData,
  updateParam,
  values
) => {
  if (updateParam === "last_update_time") {
    try {
      if (!values.startDate && !values.endDate) {
        return setFilteredData(filterableData);
      }
      const newData = await filterableData.filter((each) => {
        return (
          new Date(each.last_update_time) >=
            Math.min(new Date(values.startDate), new Date(values.endDate)) &&
          new Date(each.last_update_time) <=
            Math.max(new Date(values.startDate), new Date(values.endDate))
        );
      });
      setFilteredData(newData);
    } catch (error) {
      console.error(error);
    }
  }
};

export const getDates = () => {
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);

  let last30Days = new Date(today);
  last30Days.setDate(today.getDate() - 30);

  let thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  let lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  let last6Months = new Date();
  last6Months.setMonth(today.getMonth() - 6);

  let last1Year = new Date();
  last1Year.setFullYear(today.getFullYear() - 1);

  let last2Years = new Date();
  last2Years.setFullYear(today.getFullYear() - 2);
  return {
    today: today,
    yesterday: yesterday,
    last7Days: last7Days,
    last30Days: last30Days,
    thisMonth: thisMonth,
    lastMonthStart: lastMonth,
    lastMonthEnd: lastMonthEnd,
    last6Months: last6Months,
    last1Year: last1Year,
    last2Years: last2Years,
  };
};
