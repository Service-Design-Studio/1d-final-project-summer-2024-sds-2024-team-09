// src/components/Welcome.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import Welcome from '../Welcome';

/**
 * @jest-environment jsdom
 */

test('renders Welcome component with correct text', () => {
    render(<Welcome />);

    // Check if the main heading is rendered
    expect(screen.getByText('Welcome to Baymax')).toBeInTheDocument();

    // Check if the lead paragraph is rendered
    expect(screen.getByText('Monitor and manage your devices seamlessly.')).toBeInTheDocument();

    // Check if the buttons are rendered with correct texts
    expect(screen.getByText('User Page')).toBeInTheDocument();
    expect(screen.getByText('Camera Page')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Record')).toBeInTheDocument();
    expect(screen.getByText('Histories')).toBeInTheDocument();
});

test('renders buttons with correct href attributes', () => {
    render(<Welcome />);

    // Check if the buttons have the correct href attributes
    expect(screen.getByText('User Page').closest('a')).toHaveAttribute('href', '/user');
    expect(screen.getByText('Camera Page').closest('a')).toHaveAttribute('href', '/camera');
    expect(screen.getByText('History').closest('a')).toHaveAttribute('href', '/history');
    expect(screen.getByText('Record').closest('a')).toHaveAttribute('href', '/record');
    expect(screen.getByText('Histories').closest('a')).toHaveAttribute('href', '/histories');
});
