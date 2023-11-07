import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { selectDateRange, updateDateRange } from "./app/ordersReducer";
import Tabs from "./components/Tabs";

function App() {
  const dispatch = useDispatch();
  const dates = useSelector(selectDateRange);
  const handleValueChange = (dateValues) => {
    dateValues.startDate &&
      dateValues.endDate &&
      dispatch(updateDateRange(dateValues));
  };

  return (
    <div className="w-full h-[100vh]">
      <div className="flex justify-between items-end px-5 py-2">
        <Tabs />
        <span className="md:w-[30rem] w-full mt-4 mx-4 flex justify-between gap-4 items-center">
          <Datepicker
            primaryColor={"blue"}
            value={dates}
            onChange={handleValueChange}
            showShortcuts={true}
            displayFormat={"DD/MM/YYYY"}
            classNames="date__picker"
            placeholder="Pick Start Date and End Date"
          />
        </span>
      </div>
    </div>
  );
}

export default App;
