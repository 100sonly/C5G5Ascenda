import { render, screen, fireEvent } from '@testing-library/react';
import GuestDropdown from '../components/GuestDropdown'; 

test('renders correctly', () => {
    render(<GuestDropdown />);
    expect(screen.getByDisplayValue('1 Room | 2 Guests')).toBeInTheDocument();
});

test('toggles dropdown menu on input click', () => {
    render(<GuestDropdown />);
    const input = screen.getByDisplayValue('1 Room | 2 Guests');
    fireEvent.click(input);
    expect(screen.getByText(/rooms/i)).toBeInTheDocument(); 
});
