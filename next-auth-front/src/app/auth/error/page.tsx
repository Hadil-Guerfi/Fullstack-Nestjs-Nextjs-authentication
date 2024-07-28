import React from "react";

function ErrorCard() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex flex-col justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Oops! Something went wrong!</h2>
        <a href="/auth/login" className="text-blue-500 mt-4">
          Back to login
        </a>
      </div>
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
      </div>
    </div>
  );
}

export default ErrorCard;
