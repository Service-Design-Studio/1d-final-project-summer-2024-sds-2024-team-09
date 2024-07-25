import React, { useState } from 'react';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';


function CamLoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNavigate = (data) => {
    localStorage.setItem('camera-data', JSON.stringify(data));
    navigate('/camera-home', { state: { cameraData: data } });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Process form data
    console.log('Form submitted:', formData);
    console.log('Username:', formData.username);
    console.log('Password', formData.password);
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, email: formData.username, password: formData.password }),
      });

      const data = await response.json();
      console.log("data: ", data);

      if (response.ok) {
        console.log('User logged in successfully:', data);
        handleNavigate(data)
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral font-ubuntu">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-100 shadow-lg rounded-lg">
        <div className="text-center">
          <img
            className="mx-auto h-48 w-auto"
            src="/public/logo.png"
            alt="Crybaby"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">crybaby</h2>
          <p className="mt-2 text-sm text-gray-600">Log in to your account</p>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none bg-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="my-4 appearance-none rounded-none bg-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CamLoginPage;
