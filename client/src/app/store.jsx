import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersReducer";

export default configureStore({
  reducer: {
    orders: ordersReducer,
  },
});
