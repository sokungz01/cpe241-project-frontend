import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, NotFoundPage } from "@/pages";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
