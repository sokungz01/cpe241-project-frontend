import { HomePage, NotFoundPage } from "@/pages";
import { ConfigProvider } from "antd";
import { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedLogin from "./components/Protected/ProtectedLogin";
import Sidebar from "./components/Sidebar/Sidebar";
import { theme } from "./config/antdTheme";
import { AuthContext, initialAuth } from "./context/auth.context";
import { IEmployee } from "./interface/employee.interface";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/Employee/AddEmployee";
import EmployeeInfo from "./pages/Employee/EmployeeInfo";
import CreateItemPage from "./pages/Item/CreateItemPage";
import ItmeInfo from "./pages/Item/ItemInfo";
import CreateItemCategoryPage from "./pages/ItemCategory/CreateItemCategoryPage";
import ItemLogInfo from "./pages/ItemLog/ItemLogInfo";
import LoginPage from "./pages/LoginPage";
import CreateMachinePage from "./pages/Machine/CreateMachine";
import MachineInfo from "./pages/Machine/MachineInfo";
import CreateMachineTypePage from "./pages/MachineType/CreateMachineTypePage";
import CreatePositionPage from "./pages/Position/CreatePosition";
import ReportInfo from "./pages/Report/ReportInfo";
import SettingsInfo from "./pages/Settings/SettingsInfo";
import CreateErrorTypePage from "./pages/ErrorType/CreateErrorTypePage";
import ServiceRequest from "./pages/Report/ServiceRequest";
import ServiceResponse from "./pages/Report/ServiceResponse";
import ReportPeriodInfo from "./pages/ReportPeriod/ReportPeriodInfo";

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
                    <Route path="edit/:id" element={<AddEmployee isEdit />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                  <Route path="machine">
                    <Route index element={<MachineInfo />} />
                    <Route path="create" element={<CreateMachinePage />} />
                    <Route
                      path="edit/:id"
                      element={<CreateMachinePage isEdit />}
                    />
                  </Route>
                  <Route path="item">
                    <Route index element={<ItmeInfo />} />
                    <Route path="create" element={<CreateItemPage />} />
                    <Route
                      path="edit/:id"
                      element={<CreateItemPage isEdit />}
                    />
                    <Route path="log" element={<ItemLogInfo />} />
                  </Route>
                  <Route path="settings">
                    <Route index element={<SettingsInfo />} />
                    <Route path="position">
                      <Route path="create" element={<CreatePositionPage />} />
                      <Route
                        path="edit/:id"
                        element={<CreatePositionPage isEdit />}
                      />
                    </Route>
                    <Route path="machinetype">
                      <Route
                        path="create"
                        element={<CreateMachineTypePage />}
                      />
                      <Route
                        path="edit/:id"
                        element={<CreateMachineTypePage isEdit />}
                      />
                    </Route>
                    <Route path="itemcategory">
                      <Route
                        path="create"
                        element={<CreateItemCategoryPage />}
                      />
                      <Route
                        path="edit/:id"
                        element={<CreateItemCategoryPage isEdit />}
                      />
                    </Route>
                    <Route path="errortype">
                      <Route path="create" element={<CreateErrorTypePage />} />
                      <Route
                        path="edit/:id"
                        element={<CreateErrorTypePage isEdit />}
                      />
                    </Route>
                  </Route>
                  <Route path="report">
                    <Route index element={<ReportInfo />} />
                    <Route path="create" element={<ServiceRequest />} />
                    <Route path="response/:id" element={<ServiceResponse />} />
                  </Route>
                  <Route path="report-period">
                    <Route index element={<ReportPeriodInfo />} />
                    <Route path="create" element={<ServiceRequest />} />
                  </Route>
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
