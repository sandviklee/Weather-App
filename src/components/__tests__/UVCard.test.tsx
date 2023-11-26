import { render, screen } from '@testing-library/react';
import UVCard from '../card/UVCard';

describe('UVCard component', () => {
    test('renders correctly', () => {
        const testUVIndex = 3;
        render(<UVCard UVindex={testUVIndex} />);
        
        const uvIndexTitle = screen.getByText('UV Index');
        expect(uvIndexTitle).toBeInTheDocument();
        const uvIndexValue = screen.getByText(testUVIndex.toString());
        expect(uvIndexValue).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { asFragment } = render(<UVCard UVindex={3} />);
        expect(asFragment()).toMatchSnapshot();
    });
});