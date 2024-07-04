import React from 'react';

const Loading = () => {
    return (
        <div className="w-full max-w-xs text-center">
            <h2 className="text-2xl font-bold mb-6">Loading...</h2>
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
    );
};

export default Loading;
