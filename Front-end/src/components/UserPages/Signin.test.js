import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signin from './Signin';
import { MemoryRouter } from 'react-router-dom';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe('Signin component', () => {
  // Purpose: Check if the Signin component renders without any issues.
  it('renders Signin component', () => {
    renderWithRouter(<Signin />);
    expect(screen.getByPlaceholderText('Enter Username')).toBeInTheDocument();
  });

  // Purpose: Verify if the input change event updates the component's state.
  it('updates state on input change', () => {
    renderWithRouter(<Signin />);
    fireEvent.change(screen.getByPlaceholderText('Enter Username'), { target: { value: 'testuser' } });
    expect(screen.getByPlaceholderText('Enter Username').value).toBe('testuser');
  });
});