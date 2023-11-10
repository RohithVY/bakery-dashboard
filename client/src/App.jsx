import { lazy, Suspense } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveTab,
  selectDateRange,
  updateDateRange,
} from "./app/ordersReducer";
import { CHARTS, TABLE } from "./constants/constants";
import { LoadingPage } from "./utilities/LoadingPage";
const Tabs = lazy(() => import("./components/Tabs"));
const Table = lazy(() => import("./components/Table"));
const Charts = lazy(() => import("./components/Charts"));

function App() {
  const dispatch = useDispatch();
  const dates = useSelector(selectDateRange);
  const activeTab = useSelector(selectActiveTab);
  const handleValueChange = (dateValues) => {
    dispatch(updateDateRange(dateValues));
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="w-full h-[100vh]">
        <div className="navbar flex justify-between items-end px-5 py-2 bg-base-100 md:flex-row flex-col">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-xl leading-loose flex items-center antialiased md:subpixel-antialiased font-semibold tracking-wider capitalize align-middle">
              Baker Delights
            </h2>
            <Tabs />
          </div>

          <span className="md:w-[30rem] w-full mt-4 lex justify-between gap-4 items-center md:ml-4">
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
        {activeTab === TABLE && <Table />}
        {activeTab === CHARTS && <Charts />}
      </div>
    </Suspense>
  );
}

export default App;
