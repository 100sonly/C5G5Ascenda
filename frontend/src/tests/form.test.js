import HeroSection from "../components/HeroSection";
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {Simulate} from "react-dom/test-utils";
import {wait} from "@testing-library/user-event/dist/utils";
import * as user from "react-dom/test-utils";


describe('HeroSection', () => {
    test('entering full information submits form to handler', async () => {
        const onSubmit = jest.fn();
        render(<HeroSection onsubmit={onSubmit}/>);
        const dest = 'Singapore, Singapore';
        const checkin = '2024-08-01';
        const checkout = '2024-08-06';
        const guests = '3 Room | 5 Guests';

        // enter text in input
        screen.getByPlaceholderText('Destination').value = dest;
        screen.getByPlaceholderText('Check-in').value = checkin;
        screen.getByPlaceholderText('Check-out').value = checkout;
        screen.getByDisplayValue("1 Room | 2 Guests").value = guests;
        // click Search
        const searchButton = screen.getByText('Search')
        searchButton.onclick=onSubmit({"dest":dest,"checkin":checkin,"checkout":checkout,"guests":guests})
        await waitFor(() => user.Simulate.click(searchButton));
        expect(onSubmit).toHaveBeenCalledWith({
            "dest": dest,
            "checkin": checkin,
            "checkout": checkout,
            "guests": guests
        })

        //expect(screen.getByPlaceholderText('hotels').value.length).toBeGreaterThan(0);

    });
})