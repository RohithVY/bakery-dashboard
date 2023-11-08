import { createSlice } from "@reduxjs/toolkit";
import { CHARTS, TABLE } from "../constants/constants";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    dateRange: { startDate: null, endDate: null },
    activeTab: CHARTS,
    tableData: {},
    errorMsg: "",
    queryStatus: ""
  },
  reducers: {
    updateDateRange: (state, action) => {
      state.dateRange = { ...action.payload };
    },
    updateActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    newTableData: (state, action) => {
      state.tableData = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDateRange, updateActiveTab, newTableData } = ordersSlice.actions;

export default ordersSlice.reducer;

// Define the selector function
export const selectDateRange = (state) => state.orders.dateRange;
export const selectActiveTab = (state) => state.orders.activeTab;
export const selectTableData = (state) => state.orders.tableData;

