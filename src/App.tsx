import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, NotFoundPage } from "@/pages";
import LoginPage from "./pages/LoginPage";
import { ConfigProvider } from "antd";
import { theme } from "./config/antdTheme";
import ProtectedLogin from "./components/Protected/ProtectedLogin";

function App() {
  return (
    <>
      <ConfigProvider theme={theme}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedLogin>
                  <HomePage />
                </ProtectedLogin>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
