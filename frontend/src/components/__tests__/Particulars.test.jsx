import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Particulars from '../profiles/Particulars.jsx';

describe('Particulars', () => {
    test('renders Particulars Title', () => {
        render(
            <Router>
                <Particulars />
            </Router>
        );

        expect(screen.getByText(/Edit Your Particulars/i)).toBeInTheDocument();
    });

    test('renders the Done link button', () => {
        render(
          <Router>
            <Particulars />
          </Router>
        );
        expect(screen.getByText(/Done/i)).toBeInTheDocument();
      });
    
    test('renders the Set New Photo file input', () => {
        render(
            <Router>
                <Particulars />
            </Router>
        );
        const fileInput = screen.getByLabelText(/Set New Photo/i);
        expect(fileInput).toBeInTheDocument();
        expect(fileInput).toHaveAttribute('type', 'file');
    });

    test('renders the First Name input', () => {
        render(
          <Router>
            <Particulars />
          </Router>
        );
        expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
      });
    
    test('renders the Last Name input', () => {
        render(
            <Router>
            <Particulars />
          </Router>
        );
        expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
        });

        test('renders the Change Name/pfp description', () => {
            render(
              <Router>
                <Particulars />
              </Router>
            );
            expect(screen.getByText(/Enter your name and add an optional profile picture/i)).toBeInTheDocument();
          });
    
        test('renders the Change Email/Number card', () => {
            render(
              <Router>
                <Particulars />
              </Router>
            );
            expect(screen.getByText(/Change Email/i)).toBeInTheDocument();
            expect(screen.getByText(/Change Number/i)).toBeInTheDocument();
          });
        
        test('renders the Navbar component', () => {
            render(
                <Router>
                    <Particulars />
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