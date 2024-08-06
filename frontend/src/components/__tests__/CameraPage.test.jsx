import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CameraPage from '../CameraPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mocking AgoraRTC
const mockClient = {
  join: jest.fn(),
  leave: jest.fn(),
  setClientRole: jest.fn(),
  publish: jest.fn(),
  remoteUsers: [],
};

const mockTrack = {
  play: jest.fn(),
  close: jest.fn(),
};

jest.mock('agora-rtc-sdk-ng', () => ({
  createClient: jest.fn(() => mockClient),
  createMicrophoneAudioTrack: jest.fn(() => Promise.resolve(mockTrack)),
  createCameraVideoTrack: jest.fn(() => Promise.resolve(mockTrack)),
}));

// Mocking useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const cameraData = {
  camera_name: 'Living Room Camera',
  id: '12345',
};

const renderWithRouter = (ui, { route = '/', state = {} } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[{ pathname: route, state }]}>
      <Routes>
        <Route path="/" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

test('renders CameraPage component', async () => {
  renderWithRouter(<CameraPage />, {
    route: '/',
    state: { cameraData },
  });

  await waitFor(() => expect(screen.getByText('Living Room Camera')).toBeInTheDocument());
  expect(screen.getByText('Watch Live')).toBeInTheDocument();
  expect(screen.getByText('Leave')).toBeInTheDocument();
});

test('handles join as host successfully', async () => {
  renderWithRouter(<CameraPage />, {
    route: '/',
    state: { cameraData },
  });

  await waitFor(() => expect(screen.getByText('Watch Live')).toBeInTheDocument());
  fireEvent.click(screen.getByText('Watch Live'));

  await waitFor(() => {
    expect(mockClient.join).toHaveBeenCalled();
  });
});

test('handles end stream successfully', async () => {
  renderWithRouter(<CameraPage />, {
    route: '/',
    state: { cameraData },
  });

  await waitFor(() => expect(screen.getByText('Watch Live')).toBeInTheDocument());
  fireEvent.click(screen.getByText('Watch Live'));

  await waitFor(() => {
    expect(mockClient.join).toHaveBeenCalled();
  });

  // Adding a delay to ensure the join process is complete
  await new Promise(resolve => setTimeout(resolve, 500));

  fireEvent.click(screen.getByText('Leave'));

  await waitFor(() => {
    expect(mockClient.leave).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/camera-home');
  });
});
