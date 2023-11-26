import { render, screen } from "@testing-library/react";
import WeatherDayCourse from "../WeatherPage/WeatherDayCourse";

const mockData = {
    extremalTemp: ["10", "2"],
    weatherCourse: ["no_weather", "no_weather", "no_weather", "no_weather"],
};

describe("WeatherDayCourse component", () => {
    test("render correctly", () => {
        render(
            <WeatherDayCourse
                extremalTemperatures={mockData.extremalTemp}
                weatherCourse={mockData.weatherCourse}
            />
        );

        const extremalTempTitle = screen.getByText("Maks/Min Temperatur");
        expect(extremalTempTitle).toBeInTheDocument();
        const extremalTemp = screen.getByText("10C° / 2C°");
        expect(extremalTemp).toBeInTheDocument();
        const imageMorning = screen.getByAltText("Morning Weather");
        expect(imageMorning).toBeInTheDocument();
        const imageNoon = screen.getByAltText("Noon Weather");
        expect(imageNoon).toBeInTheDocument();
        const imageAfternoon = screen.getByAltText("Afternoon Weather");
        expect(imageAfternoon).toBeInTheDocument();
        const imageNight = screen.getByAltText("Night Weather");
        expect(imageNight).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <WeatherDayCourse
                extremalTemperatures={mockData.extremalTemp}
                weatherCourse={mockData.weatherCourse}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});