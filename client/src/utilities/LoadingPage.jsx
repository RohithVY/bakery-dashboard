import React from "react";

export const LoadingPage = () => {
  return (
    <>
      <div class="relative flex justify-center items-center mt-40">
        <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          class="rounded-full h-28 w-28"
        />
      </div>
      <p class="w-full text-center mt-7 text-gray-500 dark:text-gray-400">
        This may take a few seconds, please don't close this page...
      </p>
    </>
  );
};

