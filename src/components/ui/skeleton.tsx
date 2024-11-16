import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="flex justify-center space-x-2 p-5">
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-[bounce_1s_infinite]"></div>
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-[bounce_1s_infinite] delay-150"></div>
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-[bounce_1s_infinite] delay-300"></div>
    </div>
  );
};

export default Skeleton;
