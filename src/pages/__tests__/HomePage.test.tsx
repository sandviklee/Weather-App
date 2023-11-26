import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from 'react-router-dom';
import {test , describe , expect, vi} from "vitest";
import { userEvent } from '@testing-library/user-event';

// Create a client for React Query
const queryClient = new QueryClient();

describe('HomePage component', () => {
    test('renders correctly with 0 favorites', () => {
        render(
            <Router>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </Router>
        );

        // Check if the search field is rendered
        const searchField = screen.getByPlaceholderText('Søk for områder');
        expect(searchField).toBeInTheDocument();

        // Check if the no places message is rendered when there are no favorites
        const noPlacesMessage = screen.getByText('Du har ikke lagt til noen lokasjoner enda, søk på en plass for å komme i gang!');
        expect(noPlacesMessage).toBeInTheDocument();
    });

    test('renders favorites correctly', async () => {   
            // Mock favorites data
        const favorites = [
            { name: 'Favorite 1', lat: 123.456, lon: 789.012 },
            { name: 'Favorite 2', lat: 345.678, lon: 901.234 },
            { name: 'Favorite 3', lat: 567.890, lon: 123.456 },
        ];
        
        // Mock localStorage to return the favorites data
        vi.spyOn(window.localStorage.__proto__, 'getItem');
        window.localStorage.__proto__.getItem = vi.fn(() => JSON.stringify(favorites));
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <HomePage />
                </Router>
            </QueryClientProvider>
        );
    
        // Check if the favorites are rendered
        const favorite1 = await screen.findAllByText('Favorite 1');
        // string "Favorite 1" will be found twice, once in the favorites list and once in the side bar 
        // since it is the first favorite and therefore selected by default
        expect(favorite1).toHaveLength(2);
        const favorite2 = await screen.findByText('Favorite 2');
        expect(favorite2).toBeInTheDocument();
        const favorite3 = await screen.findByText('Favorite 3');
        expect(favorite3).toBeInTheDocument();
    });

    test("Favorite 2 is selected", async () => {
            // Mock favorites data
        const favorites = [
            { name: 'Favorite 1', lat: 123.456, lon: 789.012 },
            { name: 'Favorite 2', lat: 345.678, lon: 901.234 },
            { name: 'Favorite 3', lat: 567.890, lon: 123.456 },
        ];
        
        // Mock localStorage to return the favorites data
        vi.spyOn(window.localStorage.__proto__, 'getItem');
        window.localStorage.__proto__.getItem = vi.fn(() => JSON.stringify(favorites));
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <HomePage />
                </Router>
            </QueryClientProvider>
        );

        // Check if Favorite 2 is selected
        const favorite2 = await screen.findByText('Favorite 2');
        expect(favorite2).toBeInTheDocument();
        favorite2.click();

        const newFavorite2 = await screen.findByText('Favorite 2');
        expect(newFavorite2.parentElement).toHaveStyle({
            backgroundColor: "rgb(0, 0, 0)",
            color: "rgb(255, 255, 255)",
        });
    });

    test("matches snapshot with no favorites", () => {
        const { asFragment } = render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <HomePage />
                </Router>
            </QueryClientProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test("matches snapshot with favorites", () => {
            // Mock favorites data
        const favorites = [
            { name: 'Favorite 1', lat: 123.456, lon: 789.012 },
            { name: 'Favorite 2', lat: 345.678, lon: 901.234 },
            { name: 'Favorite 3', lat: 567.890, lon: 123.456 },
        ];
        
        // Mock localStorage to return the favorites data
        vi.spyOn(window.localStorage.__proto__, 'getItem');
        window.localStorage.__proto__.getItem = vi.fn(() => JSON.stringify(favorites));
        const { asFragment } = render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <HomePage />
                </Router>
            </QueryClientProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
    
    test("Search renders correctly", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <HomePage />
                </Router>
            </QueryClientProvider>
        );
        const searchField = screen.getByPlaceholderText('Søk for områder');
        expect(searchField).toBeInTheDocument();

        // triger search popup
        await userEvent.type(searchField, "lol");
        
        // the test string only appears in the search popup therefore we can use it to check if the popup is rendered
        const filter = await screen.getByText("Tilbakestill filtre");
        expect(filter).toBeInTheDocument();
    });

    test("Search matches snapshot", async () => {
        const { asFragment } = render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <HomePage />
                </Router>
            </QueryClientProvider>
        );
        const searchField = screen.getByPlaceholderText('Søk for områder');

        // triger search popup
        await userEvent.type(searchField, "lol");
        
        await expect(asFragment()).toMatchSnapshot();
    });
});