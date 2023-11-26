import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes} from 'react-router-dom';
import WeatherPage from '../WeatherPage';

// Create a client for React Query
const queryClient = new QueryClient();

describe('WeatherPage component', () => {
    test('renders WeatherPage component', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/weather/Oslo/60/10']}>
                    <Routes>
                        <Route path="/weather/:title/:lat/:lon" element={<WeatherPage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        // Check if the title is rendered
        expect(screen.getByText('OSLO')).toBeInTheDocument();
        expect(screen.getByText('0 C°')).toBeInTheDocument();
        expect(screen.getByText('Maks/Min Temperatur')).toBeInTheDocument();
        expect(screen.getByText('NATT')).toBeInTheDocument();
        expect(screen.getByText('KVELD')).toBeInTheDocument();   
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/weather/Oslo/60/10']}>
                    <Routes>
                        <Route path="/weather/:title/:lat/:lon" element={<WeatherPage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});