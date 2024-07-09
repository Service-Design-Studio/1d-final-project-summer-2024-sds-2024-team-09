import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Login from '../user/Login';

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        mockedNavigate.mockClear();
    });

    test('renders login form', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
        expect(screen.getByText(/forget password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('navigates to /user-home on login button click', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(mockedNavigate).toHaveBeenCalledWith("/user-home");
    });

    test('navigates to home page on back button click', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
});
