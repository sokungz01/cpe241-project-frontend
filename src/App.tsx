import { NotFoundPage } from "@/pages";
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
      <div className="flex flex-row">
        <Sidebar />
        <Outlet />
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
            <Route path="login" element={<LoginPage />} />

            <Route
              path="tools"
              element={
                <ProtectedLogin>
                  <NavbarAndSidebar />
                </ProtectedLogin>
              }
            >
              <Route index path="employeeInfo" element={<EmployeeInfo />} />
              <Route path="addEmployee" element={<AddEmployee />} />
              <Route path="fixReport" element={<FixReport />} />
              <Route path="machineInfo" element={<MachineInfo />} />
              <Route path="stockHistory" element={<StockHistory />} />
              <Route path="dashboard" element={<Dashboard />} />
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
