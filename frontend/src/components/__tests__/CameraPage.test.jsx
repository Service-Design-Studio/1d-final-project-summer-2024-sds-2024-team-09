import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CameraPage from '../CameraPage.jsx';
import AgoraRTC from 'agora-rtc-sdk-ng';

// Mock AgoraRTC functions
jest.mock('agora-rtc-sdk-ng', () => {
    return {
        createClient: jest.fn(() => ({
            setClientRole: jest.fn(),
            join: jest.fn(),
            publish: jest.fn(),
            leave: jest.fn(),
            remoteUsers: [],
        })),
        createMicrophoneAudioTrack: jest.fn(),
        createCameraVideoTrack: jest.fn(),
        AudienceLatencyLevelType: { AUDIENCE_LEVEL_LOW_LATENCY: 'low' },
    };
});

beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
});

test('renders CameraPage component', () => {
    const { getByText } = render(<CameraPage />);
    expect(getByText('Camera Page')).toBeInTheDocument();
    expect(getByText('This page is the UI page for the camera at home.')).toBeInTheDocument();
    expect(getByText('Join as Host')).toBeInTheDocument();
    expect(getByText('Leave')).toBeInTheDocument();
});

test('handles join as host successfully', async () => {
    const mockClient = AgoraRTC.createClient();
    const mockAudioTrack = {};
    const mockVideoTrack = {
        play: jest.fn(),
    };
    AgoraRTC.createMicrophoneAudioTrack.mockResolvedValue(mockAudioTrack);
    AgoraRTC.createCameraVideoTrack.mockResolvedValue(mockVideoTrack);

    const { getByText } = render(<CameraPage />);

    fireEvent.click(getByText('Join as Host'));

    await waitFor(() => expect(mockClient.join).toHaveBeenCalled());
    await waitFor(() => expect(mockClient.publish).toHaveBeenCalledWith([mockAudioTrack, mockVideoTrack]));
    expect(document.body.querySelector('div#00001')).toBeInTheDocument();
    expect(mockVideoTrack.play).toHaveBeenCalled();
});

test('handles end stream successfully', async () => {
    const mockClient = AgoraRTC.createClient();
    const mockAudioTrack = { close: jest.fn() };
    const mockVideoTrack = { close: jest.fn() };
    AgoraRTC.createMicrophoneAudioTrack.mockResolvedValue(mockAudioTrack);
    AgoraRTC.createCameraVideoTrack.mockResolvedValue(mockVideoTrack);

    const { getByText } = render(<CameraPage />);

    // Simulate joining as host
    fireEvent.click(getByText('Join as Host'));
    await waitFor(() => expect(mockClient.join).toHaveBeenCalled());

    // Simulate ending the stream
    fireEvent.click(getByText('Leave'));
    await waitFor(() => expect(mockAudioTrack.close).toHaveBeenCalled());
    await waitFor(() => expect(mockVideoTrack.close).toHaveBeenCalled());
    await waitFor(() => expect(mockClient.leave).toHaveBeenCalled());

    expect(document.body.querySelector('div#00001')).not.toBeInTheDocument();
});