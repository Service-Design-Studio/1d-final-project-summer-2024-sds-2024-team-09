import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from '../ProfilePage.jsx';

describe('ProfilePage', () => {
    test('renders Profile Page Title + Username', () => {
        render(
            <Router>
                <ProfilePage />
            </Router>
        );

        expect(screen.getByText(/Profile Page/i)).toBeInTheDocument();
        expect(screen.getByText(/SDS Team 9/i)).toBeInTheDocument();
    });


    test('renders Profile Picture', () => {
        render(
            <Router>
                <ProfilePage />
            </Router>
        );

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    });

    test('renders Edit Your Particulars link', () => {
        render(
            <Router>
                <ProfilePage />
            </Router>
        );

        expect(screen.getByText('Edit Your Particulars')).toBeInTheDocument();
        expect(screen.getByText('Edit Your Particulars').closest('a')).toHaveAttribute('href', '/profile/particulars');
    });

    test('renders Edit Account Settings link', () => {
        render(
            <Router>
                <ProfilePage />
            </Router>
        );

        expect(screen.getByText('Edit Account Settings')).toBeInTheDocument();
        expect(screen.getByText('Edit Account Settings').closest('a')).toHaveAttribute('href', '/profile/accsettings');
    });

    test('renders Add/Delete Camera link', () => {
        render(
            <Router>
                <ProfilePage />
            </Router>
        );

        expect(screen.getByText('Add/Delete Camera')).toBeInTheDocument();
        expect(screen.getByText('Add/Delete Camera').closest('a')).toHaveAttribute('href', '/profile/editcams');
    });

    test('renders All the Settings Cards appear', () => {
        render(
            <Router>
                <ProfilePage />
            </Router>
        );

        expect(screen.getByText('Enable Telegram')).toBeInTheDocument();
        expect(screen.getByText('Edit Cry Detection Settings')).toBeInTheDocument();
        expect(screen.getByText('Trusted Members')).toBeInTheDocument();
    });

    test('renders the Navbar component', () => {
        render(
            <Router>
                <ProfilePage />
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