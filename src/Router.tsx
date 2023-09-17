import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";

const Router = () => {
    return (
        <BrowserRouter basename="/project1">
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/Weather/:id" element={<WeatherPage lat="63.43048" lon="10.39506"/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
