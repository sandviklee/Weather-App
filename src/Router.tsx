import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";

const Router = () => {
  return (
    <BrowserRouter basename="/project1">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="location/:title/:lat/:lon" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
