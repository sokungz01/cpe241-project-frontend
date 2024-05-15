import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HomePage, NotFoundPage } from "@/pages";
import LoginPage from "./pages/LoginPage";
import { ConfigProvider } from "antd";
import { theme } from "./config/antdTheme";
import EmployeeInfo from "./pages/EmployeeInfo/EmployeeInfo";
import FixReport from "./pages/FixReport";
import MachineInfo from "./pages/MachineInfo";
import StockHistory from "./pages/StockHistory";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddEmployee from "./pages/EmployeeInfo/AddEmployee";

const NavbarAndSidebar = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row relative">
        <div className="flex z-10">
          <Sidebar />
        </div>
        <div className="overflow-hidden w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <ConfigProvider theme={theme}>
        <BrowserRouter basename="/">
          <Routes>
            <Route element={<NavbarAndSidebar />}>
              <Route path="employeeInfo">
                <Route index element={<EmployeeInfo />} />
                <Route path="addEmployee" element={<AddEmployee />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="/fixReport" element={<FixReport />} />
              <Route path="/machineInfo" element={<MachineInfo />} />
              <Route path="/stockHistory" element={<StockHistory />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
