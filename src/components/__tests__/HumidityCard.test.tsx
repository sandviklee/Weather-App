import { render, screen } from '@testing-library/react';
import HumidityCard from '../card/HumidityCard';

describe('HumidityCard component', () => {
    test('renders correctly with low humidity', () => {
        render(<HumidityCard humidity={20} />);
        
        const humidityStatus = screen.getByText('Lav');
        expect(humidityStatus).toBeInTheDocument();
        const humidityValue = screen.getByText('20%');
        expect(humidityValue).toBeInTheDocument();
    });

    test('renders correctly with normal humidity', () => {
        render(<HumidityCard humidity={50} />);
        
        const humidityStatus = screen.getByText('Normal');
        expect(humidityStatus).toBeInTheDocument();
        const humidityValue = screen.getByText('50%');
        expect(humidityValue).toBeInTheDocument();
    });

    test('renders correctly with high humidity', () => {
        render(<HumidityCard humidity={70} />);
        
        const humidityStatus = screen.getByText('Høy');
        expect(humidityStatus).toBeInTheDocument();
        const humidityValue = screen.getByText('70%');
        expect(humidityValue).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { asFragment } = render(<HumidityCard humidity={20} />);
        expect(asFragment()).toMatchSnapshot();
    });
});