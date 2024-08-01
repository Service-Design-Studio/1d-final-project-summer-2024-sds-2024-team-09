import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CameraPage from '../CameraPage';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { act } from 'react';

// Mock AgoraRTC functions
jest.mock('agora-rtc-sdk-ng', () => ({
    createMicrophoneAudioTrack: jest.fn(),
    createCameraVideoTrack: jest.fn(),
    createClient: jest.fn(() => ({
        setClientRole: jest.fn(),
        join: jest.fn(),
        publish: jest.fn(),
        leave: jest.fn(),
        remoteUsers: [],
    })),
}));

describe('CameraPage', () => {
    const mockCameraData = { id: 'test-id', camera_name: 'Living Room Camera' };
    const mockClient = AgoraRTC.createClient();

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('renders CameraPage component', async () => {
        await act(async () => {
            const { getByText } = render(
                <Router>
                    <CameraPage location={{ state: { cameraData: mockCameraData } }} />
                </Router>
            );

            await waitFor(() => expect(getByText('Living Room Camera')).toBeInTheDocument());
            expect(getByText('Watch Live')).toBeInTheDocument();
            expect(getByText('Leave')).toBeInTheDocument();
        });
    });

    it('handles join as host successfully', async () => {
        const mockVideoTrack = { play: jest.fn() };
        const mockAudioTrack = { play: jest.fn() };
        AgoraRTC.createCameraVideoTrack.mockResolvedValue(mockVideoTrack);
        AgoraRTC.createMicrophoneAudioTrack.mockResolvedValue(mockAudioTrack);

        await act(async () => {
            const { getByText } = render(
                <Router>
                    <CameraPage location={{ state: { cameraData: mockCameraData } }} />
                </Router>
            );

            fireEvent.click(getByText('Watch Live'));

            await waitFor(() => {
                expect(mockClient.join).toHaveBeenCalled();
                expect(mockClient.publish).toHaveBeenCalledWith([mockAudioTrack, mockVideoTrack]);
                expect(mockVideoTrack.play).toHaveBeenCalled();
            });
        });
    });

    it('handles end stream successfully', async () => {
        const mockAudioTrack = { close: jest.fn() };
        const mockVideoTrack = { close: jest.fn() };
        AgoraRTC.createMicrophoneAudioTrack.mockResolvedValue(mockAudioTrack);
        AgoraRTC.createCameraVideoTrack.mockResolvedValue(mockVideoTrack);

        await act(async () => {
            const { getByText } = render(
                <Router>
                    <CameraPage location={{ state: { cameraData: mockCameraData } }} />
                </Router>
            );

            // Simulate joining as host
            fireEvent.click(getByText('Watch Live'));
            await waitFor(() => expect(mockClient.join).toHaveBeenCalled());

            // Simulate ending the stream
            fireEvent.click(getByText('Leave'));
            await waitFor(() => expect(mockAudioTrack.close).toHaveBeenCalled());
            await waitFor(() => expect(mockVideoTrack.close).toHaveBeenCalled());
            await waitFor(() => expect(mockClient.leave).toHaveBeenCalled());

            // Ensure the video player is removed from the DOM
            expect(document.body.querySelector('div#00001')).not.toBeInTheDocument();
        });
    });
});