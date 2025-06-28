import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-text">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">The page you are looking for does not exist.</p>
        <a href="/home" className="text-button-primary hover:underline">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
