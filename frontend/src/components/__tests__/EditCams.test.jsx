import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import EditCams from '../profiles/EditCams.jsx';

describe('EditCams', () => {
    test('renders EditCams Title', () => {
        render(
            <Router>
                <EditCams />
            </Router>
        );

        expect(screen.getByText(/Edit Camera's/i)).toBeInTheDocument();
    });

    test('renders the Done link button', () => {
        render(
          <Router>
            <EditCams />
          </Router>
        );
        expect(screen.getByText(/Done/i)).toBeInTheDocument();
      });

      test('checks that camera cards renders', () => {
        render(
            <Router>
                <EditCams />
            </Router>
        );
    
        // Check that the camera cards are rendered
        expect(screen.getByText('Bedroom')).toBeInTheDocument();
        expect(screen.getByText('Living Room')).toBeInTheDocument();
        expect(screen.getByText('Child Room')).toBeInTheDocument();
    });
    
    test('add new camera button clicks', () => {
        render(
            <Router>
                <EditCams />
            </Router>
        );
    
        // Check that the delete buttons are rendered and clickable
        const addButton = screen.getByText('+ Add New Camera');
        fireEvent.click(addButton);
    });
    
    test('delete button clicks', () => {
        render(
            <Router>
                <EditCams />
            </Router>
        );
    
        // Check that the delete buttons are rendered and clickable
        const deleteButtons = screen.getAllByRole('button', { name: '' });
        deleteButtons.forEach(button => {
            fireEvent.click(button);
            // Add your assertions here if you have specific behavior on click
        });
    });
});