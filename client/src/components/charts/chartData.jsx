export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const itemPrices = { Cake: 500, Cookies: 50, Muffins: 100 };

export const getOrderStats = (orders) => {
  let monthOrders = {};
  let weekdayOrders = {};
  let dailyOrders = {};
  let hourlyOrders = {};
  let yearlyOrders = {};
  let monthTotalPrices = {};
  let weekdayTotalPrices = {};
  let dailyTotalPrices = {};
  let hourlyTotalPrices = {};
  let yearlyTotalPrices = {};

  orders &&
    orders.forEach((order) => {
      if (!order.last_update_time || !itemPrices[order.item_type]) {
        return;
      }

      let date = new Date(order.last_update_time);
      if (isNaN(date.getTime())) {
        return;
      }

      let month = monthNames[date.getMonth()];
      let weekday = weekdayNames[date.getDay()];
      let day = date.toLocaleDateString();
      let hour = date.getHours();
      let price = itemPrices[order.item_type];
      let totalPrice = price;
      let year = date.getFullYear();

      if (!monthOrders[month]) {
        monthOrders[month] = 0;
        monthTotalPrices[month] = 0;
      }
      monthOrders[month]++;
      monthTotalPrices[month] += totalPrice;

      if (!weekdayOrders[weekday]) {
        weekdayOrders[weekday] = 0;
        weekdayTotalPrices[weekday] = 0;
      }
      weekdayOrders[weekday]++;
      weekdayTotalPrices[weekday] += totalPrice;

      if (!dailyOrders[day]) {
        dailyOrders[day] = 0;
        dailyTotalPrices[day] = 0;
      }
      dailyOrders[day]++;
      dailyTotalPrices[day] += totalPrice;

      if (!hourlyOrders[hour]) {
        hourlyOrders[hour] = 0;
        hourlyTotalPrices[hour] = 0;
      }
      hourlyOrders[hour]++;
      hourlyTotalPrices[hour] += totalPrice;

      if (!yearlyOrders[year]) {
        yearlyOrders[year] = 0;
        yearlyTotalPrices[year] = 0;
      }
      yearlyOrders[year]++;
      yearlyTotalPrices[year] += totalPrice;
    });

  return {
    months: monthOrders,
    weekdays: weekdayOrders,
    daily: dailyOrders,
    hourly: hourlyOrders,
    yearlyOrders: yearlyOrders,
    monthTotalPrices: monthTotalPrices,
    weekdayTotalPrices: weekdayTotalPrices,
    dailyTotalPrices: dailyTotalPrices,
    hourlyTotalPrices: hourlyTotalPrices,
    yearlyTotalPrices: yearlyTotalPrices,
  };
};

export const getItemStats = (orders, itemType) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    return {
      months: {},
      weekdays: {},
      daily: {},
      hourly: {},
    };
  }

  let monthOrders = {};
  let weekdayOrders = {};
  let dailyOrders = {};
  let hourlyOrders = {};

  let itemOrders = orders.filter((order) => order.item_type === itemType);

  itemOrders.forEach((order) => {
    if (!order.last_update_time) {
      return;
    }

    let date = new Date(order.last_update_time);
    if (isNaN(date.getTime())) {
      return;
    }

    let month = monthNames[date.getMonth()];
    let weekday = weekdayNames[date.getDay()];
    let day = date.toLocaleDateString();
    let hour = date.getHours();

    if (!monthOrders[month]) {
      monthOrders[month] = 0;
    }
    monthOrders[month]++;

    if (!weekdayOrders[weekday]) {
      weekdayOrders[weekday] = 0;
    }
    weekdayOrders[weekday]++;

    if (!dailyOrders[day]) {
      dailyOrders[day] = 0;
    }
    dailyOrders[day]++;

    if (!hourlyOrders[hour]) {
      hourlyOrders[hour] = 0;
    }
    hourlyOrders[hour]++;
  });

  return {
    months: monthOrders,
    weekdays: weekdayOrders,
    daily: dailyOrders,
    hourly: hourlyOrders,
  };
};

export const getStateStats = (orders, stateType) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    return {
      months: {},
      weekdays: {},
      daily: {},
      hourly: {},
    };
  }

  let monthOrders = {};
  let weekdayOrders = {};
  let dailyOrders = {};
  let hourlyOrders = {};

  let stateOrders = orders.filter((order) => order.order_state === stateType);

  stateOrders.forEach((order) => {
    if (!order.last_update_time) {
      return;
    }

    let date = new Date(order.last_update_time);
    if (isNaN(date.getTime())) {
      return;
    }

    let month = monthNames[date.getMonth()];
    let weekday = weekdayNames[date.getDay()];
    let day = date.toLocaleDateString();
    let hour = date.getHours();

    if (!monthOrders[month]) {
      monthOrders[month] = 0;
    }
    monthOrders[month]++;

    if (!weekdayOrders[weekday]) {
      weekdayOrders[weekday] = 0;
    }
    weekdayOrders[weekday]++;

    if (!dailyOrders[day]) {
      dailyOrders[day] = 0;
    }
    dailyOrders[day]++;

    if (!hourlyOrders[hour]) {
      hourlyOrders[hour] = 0;
    }
    hourlyOrders[hour]++;
  });

  return {
    months: monthOrders,
    weekdays: weekdayOrders,
    daily: dailyOrders,
    hourly: hourlyOrders,
  };
};

export const getTopBranches = (orders, topN = 5) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    return [];
  }

  let successfulOrders = orders.filter(
    (order) =>
      order.order_state === "Delivered" || order.order_state === "Shipped"
  );

  let branchCounts = successfulOrders.reduce((counts, order) => {
    let branch = order.branch;
    if (!counts[branch]) {
      counts[branch] = 0;
    }
    counts[branch]++;
    return counts;
  }, {});

  let branchArray = Object.entries(branchCounts);
  branchArray.sort((a, b) => b[1] - a[1]);

  return branchArray
    .slice(0, topN)
    .map((entry) => ({ branch: entry[0], count: entry[1] }));
};
