import { render, screen } from "@testing-library/react";
import WeatherInfo from "../WeatherPage/WeatherInfo";

const mockData = {
    temperature: "10",
    precipitation: "2",
    wind: "4",
};

describe("WeatherInfo component", () => {
    test("render correctly", () => {
        render(
            <WeatherInfo
                temperature={mockData.temperature}
                rain={mockData.precipitation}
                wind={mockData.wind}
            />
        );
    
        const temperature = screen.getByText("10 C°");
        expect(temperature).toBeInTheDocument();
        const precipitation = screen.getByText("2");
        expect(precipitation).toBeInTheDocument();
        const wind = screen.getByText("4");
        expect(wind).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <WeatherInfo
                temperature={mockData.temperature}
                rain={mockData.precipitation}
                wind={mockData.wind}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
