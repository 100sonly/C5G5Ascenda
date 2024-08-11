import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchForm from '../components/SearchForm'; // adjust the import path as needed

describe('SearchForm Component', () => {
    test('displays error when check-in date is not after today', () => {
        // Mock today's date
        const today = new Date().toISOString().split('T')[0];

        render(<SearchForm customClass="" handleChildren={() => {}} handleParents={() => {}} params={{}} />);

        // Get the check-in input field
        const checkinInput = screen.getByPlaceholderText('Check-in');

        // Set the value to today's date (or a past date) to trigger validation error
        fireEvent.input(checkinInput, { target: { value: today } });

        // Assert that the error message is displayed
        expect(screen.getByText('Check-in date must be after today.')).toBeInTheDocument();
    });

    test('does not display error when check-in date is after today', () => {
        // Mock a future date
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1); // tomorrow
        const futureDateString = futureDate.toISOString().split('T')[0];

        render(<SearchForm customClass="" handleChildren={() => {}} handleParents={() => {}} params={{}} />);

        // Get the check-in input field
        const checkinInput = screen.getByPlaceholderText('Check-in');

        // Set the value to a future date
        fireEvent.input(checkinInput, { target: { value: futureDateString } });

        // Assert that the error message is not displayed
        expect(screen.queryByText('Check-in date must be after today.')).not.toBeInTheDocument();
    });
});
