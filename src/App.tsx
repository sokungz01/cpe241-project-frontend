import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, NotFoundPage } from "@/pages";
import LoginPage from "./pages/LoginPage";
import { ConfigProvider } from "antd";
import { theme } from "./config/antdTheme";

function App() {
  return (
    <>
      <ConfigProvider theme={theme}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
