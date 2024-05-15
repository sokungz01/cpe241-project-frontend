import { HomePage, NotFoundPage } from "@/pages";
import { ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { theme } from "./config/antdTheme";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/EmployeeInfo/AddEmployee";
import EmployeeInfo from "./pages/EmployeeInfo/EmployeeInfo";
import FixReport from "./pages/FixReport";
import LoginPage from "./pages/LoginPage";
import MachineInfo from "./pages/MachineInfo";
import StockHistory from "./pages/StockHistory";
import ProtectedLogin from "./components/Protected/ProtectedLogin";

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
            <Route
              element={
                <ProtectedLogin>
                  <NavbarAndSidebar />
                </ProtectedLogin>
              }
            >
              <Route path="tools">
                <Route index element={<EmployeeInfo />} />
                <Route path="addEmployee" element={<AddEmployee />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="fixReport" element={<FixReport />} />
              <Route path="machineInfo" element={<MachineInfo />} />
              <Route path="stockHistory" element={<StockHistory />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route>
              <Route path="/" element={<HomePage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
