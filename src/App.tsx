import { HomePage, NotFoundPage } from "@/pages";
import { ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { theme } from "./config/antdTheme";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/Employee/AddEmployee";
import EmployeeInfo from "./pages/Employee/EmployeeInfo";
import FixReport from "./pages/FixReport";
import LoginPage from "./pages/LoginPage";
import MachineInfo from "./pages/Machine/MachineInfo";
import StockHistory from "./pages/StockHistory";
import ProtectedLogin from "./components/Protected/ProtectedLogin";
import { AuthContext, initialAuth } from "./context/auth.context";
import { IEmployee } from "./interface/employee.interface";
import { useState } from "react";
import CreateMachinePage from "./pages/Machine/CreateMachine";

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
  const [authContext, setAuthContext] = useState<IEmployee>(initialAuth);
  return (
    <>
      <ConfigProvider theme={theme}>
        <AuthContext.Provider value={{ authContext, setAuthContext }}>
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
                  <Route path="employee">
                    <Route index element={<EmployeeInfo />} />
                    <Route path="create" element={<AddEmployee />} />
                    <Route path="edit/:id" element={<AddEmployee />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                  <Route path="machine">
                    <Route index element={<MachineInfo />} />
                    <Route path="create" element={<CreateMachinePage />} />
                  </Route>
                  <Route path="fixReport" element={<FixReport />} />
                  <Route path="stockHistory" element={<StockHistory />} />
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
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
        </AuthContext.Provider>
      </ConfigProvider>
    </>
  );
}

export default App;
