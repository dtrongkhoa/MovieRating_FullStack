import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from './Signup';
import { MemoryRouter } from 'react-router-dom';
jest.mock('axios');


const renderWithRouter = (ui, { route = '/' } = {}) => {
  
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe('Signup component', () => {
  // Purpose: Check if the Signup component renders without any issues.
  it('renders Signup component', () => {
    renderWithRouter(<Signup />);
    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
  });

  // Purpose: Verify if the input change event updates the component's state.
  it('updates state on input change', () => {
    renderWithRouter(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'testuser' } });
    expect(screen.getByPlaceholderText('User Name').value).toBe('testuser');
  });
});
