import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import AccSettings from '../profiles/AccSettings.jsx';

describe('AccSettings', () => {
    test('renders AccSettings Title', () => {
        render(
            <Router>
                <AccSettings />
            </Router>
        );

        expect(screen.getByText(/Edit Your Account Settings/i)).toBeInTheDocument();
    });

    test('renders the Done link button', () => {
        render(
          <Router>
            <AccSettings />
          </Router>
        );
        expect(screen.getByText(/Done/i)).toBeInTheDocument();
      });

    test('renders the Username input', () => {
        render(
          <Router>
            <AccSettings />
          </Router>
        );
        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
      });
    
      test('toggles password visibility', () => {
        render(
            <Router>
              <AccSettings />
            </Router>
          );
        
        // Check if the password input is initially of type "password"
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
    
        // Click the toggle password visibility icon
        const toggleIcon = screen.getByTestId('toggle-visibility');
        fireEvent.click(toggleIcon);
    
        // Check if the password input type has changed to "text"
        expect(passwordInput).toHaveAttribute('type', 'text');
    
        // Click the toggle password visibility icon again
        fireEvent.click(toggleIcon);
    
        // Check if the password input type has changed back to "password"
        expect(passwordInput).toHaveAttribute('type', 'password');
      });    

        test('renders Change your Password header', () => {
            render(
                <Router>
                    <AccSettings />
                </Router>
            );
    
            expect(screen.getByText(/Change your Password/i)).toBeInTheDocument();
        });

        test('renders the Current Password input', () => {
            render(
                <Router>
                <AccSettings />
              </Router>
            );
            expect(screen.getByPlaceholderText(/Current Password/i)).toBeInTheDocument();
        });

        test('renders the New Password input', () => {
            render(
                <Router>
                    <AccSettings />
                </Router>
            );
            expect(screen.getByPlaceholderText(/New Password/i)).toBeInTheDocument();
        });
        
        test('renders the Retype Password input', () => {
            render(
                <Router>
                    <AccSettings />
                </Router>
            );
            expect(screen.getByPlaceholderText(/Retype Password/i)).toBeInTheDocument();
        });

        test('renders the Change Password button', () => {
            render(
              <Router>
                <AccSettings />
              </Router>
            );
            const changePasswordButton = screen.getByRole('button', { name: /Change Password/i });
            expect(changePasswordButton).toBeInTheDocument();
            expect(changePasswordButton).toHaveAttribute('type', 'submit');
          });
        
        test('renders the Delete Account button', () => {
            render(
              <Router>
                <AccSettings />
              </Router>
            );
            const deleteAccountButton = screen.getByRole('button', { name: /Delete Account/i });
            expect(deleteAccountButton).toBeInTheDocument();
            expect(deleteAccountButton).toHaveAttribute('type', 'submit');
          });
        
        test('renders the Navbar component', () => {
            render(
                <Router>
                    <AccSettings />
                </Router>
            );
            // Check for some elements that are rendered by the Navbar component
            // For example, checking for icons if they exist
            expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /History/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /Statistics/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /Profile/i })).toBeInTheDocument();
        });
});