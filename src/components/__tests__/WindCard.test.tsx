import { render, screen } from '@testing-library/react';
import WindCard from '../card/WindCard';

describe('WindCard component', () => {
    test('renders correctly', () => {
        const testWindSpeed = 5;
        const testWindGust = 10;
        const testWindDirection = 90;
        render(<WindCard WindSpeed={testWindSpeed} WindGust={testWindGust} WindDirection={testWindDirection} />);
        
        const windTitle = screen.getByText('Vind');
        expect(windTitle).toBeInTheDocument();
        const windSpeedValue = screen.getByText(`${testWindSpeed}m/s`);
        expect(windSpeedValue).toBeInTheDocument();
        const windGustValue = screen.getByText(`(${testWindGust})`);
        expect(windGustValue).toBeInTheDocument();
        const windDirectionValue = screen.getByText('øst');
        expect(windDirectionValue).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { asFragment } = render(<WindCard WindSpeed={5} WindGust={10} WindDirection={90} />);
        expect(asFragment()).toMatchSnapshot();
    });
});