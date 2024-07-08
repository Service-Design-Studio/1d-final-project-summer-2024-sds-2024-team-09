import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const funFacts = [
  "Babies can swallow and breathe at the same time.",
  "Babies are born with natural swimming abilities and can hold their breath.",
  "A baby's head is 1/4th of its total length, but by the age of 25 will only be 1/8th of its total length.",
  "Babies are born with 300 bones, but by adulthood the number is reduced to 206.",
  "Babies are always born with blue eyes. The color of the eyes changes within a few weeks.",
  "A baby's cry is unique to them, and can be identified by their mother",
  "Babies are born with the ability to differentiate between different languages.",
  "Babies can recognize the smell and voice of their mother at birth.",
]

const Loading = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate('/');
  }
  const [funFact, setFunFact] = useState("");


  useEffect(() => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFunFact(randomFact);
  }, []);

  return (
    <div className="flex justify-center h-screen">
      <div className="p-8 max-w-sm mx-auto">
        <button className="text-left mb-4" onClick={() => backHome()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="my-40">
          <div className="text-center items-center">
            <img
              src="/public/others/crybaby.gif"
              alt="Loading"
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mt-6">Loading...</h2>

            <p className="text-gray-500 mt-2">{funFact}</p>
          </div>
        </div>


        <div className="loader"></div>
        <style jsx>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border-top-color: #3498db;
          animation: spin 1s ease-in-out infinite;
          margin: auto;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      </div>
    </div >
  );
};

export default Loading;
