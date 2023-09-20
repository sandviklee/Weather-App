import { render, screen } from "@testing-library/react";
import WeatherInfo from "./WeatherInfo";

const mockData = {
    temperature: "10",
    precipitation: "2",
    wind: "4",
};

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
