import React from "react";
import { useAuthStore } from "../utils/zustandStore.js";

const AiResBox = ({firstAiRes,secondAiRes,thirdAiRes} ) => {
  const { isFirstAi, isSecondAi, isThirdAi } = useAuthStore();
  return (
    <div className="w-full h-6/12  py-3  gap-3 flex rounded-2xl">
      {isFirstAi ? (
        <div className={`w-1/3 h-full  bg-gray-900 rounded-2xl overflow-scroll p-3 text-justify custom-scroll`}>{firstAiRes}</div>
      ) : (
        <div
          className={`w-1/3 h-full  bg-gray-700 rounded-2xl flex justify-center items-center`}
        >
          Disabled
        </div>
      )}
      {isSecondAi ? (
        <div className={`w-1/3 h-full  bg-gray-900 rounded-2xl p-3 text-justify`}>{secondAiRes}</div>
      ) : (
        <div
          className={`w-1/3 h-full  bg-gray-700 rounded-2xl flex justify-center items-center`}
        >
          Disabled
        </div>
      )}
      {isThirdAi ? (
        <div className={`w-1/3 h-full  bg-gray-900 rounded-2xl p-3 text-justify`}>{thirdAiRes}</div>
      ) : (
        <div
          className={`w-1/3 h-full  bg-gray-700 rounded-2xl flex justify-center items-center`}
        >
          Disabled
        </div>
      )}
    </div>
  );
};

export default AiResBox;
