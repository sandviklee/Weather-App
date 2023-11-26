import { render, screen } from '@testing-library/react';
import Card from '../card/Card.tsx';
import { WeatherStatus } from '../icon/WeatherIcon.tsx';

const weatherStatus: WeatherStatus = 'clearsky_day';

const mockData = {
    location: 'Test Location',
    selected: false,
    temperature: 20,
    next12hours: 15,
    status: weatherStatus,
};

describe('Card component', () => {
    test('renders correctly', () => {
        render(<Card {...mockData} />);
        
        const location = screen.getByText(mockData.location);
        expect(location).toBeInTheDocument();
        const temperature = screen.getByText(`${mockData.temperature}°`);
        expect(temperature).toBeInTheDocument();
        const next12hours = screen.getByText(`${mockData.next12hours}°`);
        expect(next12hours).toBeInTheDocument();
    });

    test('applies the correct styles when selected', () => {
        render(<Card {...{ ...mockData, selected: true }} />);
        const cardContainer = screen.getByText(mockData.location).parentElement;
        expect(cardContainer).toHaveStyle({
            backgroundColor: "rgb(0, 0, 0)",
            color: "rgb(255, 255, 255)",
        });
    });

    test('matches snapshot', () => {
        const { asFragment } = render(<Card {...mockData} />);
        expect(asFragment()).toMatchSnapshot();
    });
});