import React from "react";
import { useAuthStore } from "../utils/zustandStore.js";

const AiResBox = () => {
  const { isFirstAi, isSecondAi, isThirdAi } = useAuthStore();
  return (
    <div className="w-full h-6/12  py-3  gap-3 flex rounded-2xl">
      {isFirstAi ? (
        <div className={`w-1/3 h-full  bg-gray-900 rounded-xl`}></div>
      ) : (
        <div
          className={`w-1/3 h-full  bg-gray-700 rounded-xl flex justify-center items-center`}
        >
          Disabled
        </div>
      )}
      {isSecondAi ? (
        <div className={`w-1/3 h-full  bg-gray-900 rounded-xl`}></div>
      ) : (
        <div
          className={`w-1/3 h-full  bg-gray-700 rounded-xl flex justify-center items-center`}
        >
          Disabled
        </div>
      )}
      {isThirdAi ? (
        <div className={`w-1/3 h-full  bg-gray-900 rounded-xl`}></div>
      ) : (
        <div
          className={`w-1/3 h-full  bg-gray-700 rounded-xl flex justify-center items-center`}
        >
          Disabled
        </div>
      )}
    </div>
  );
};

export default AiResBox;
