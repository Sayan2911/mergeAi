import React, { useState } from "react";
import { useAuthStore } from "../utils/zustandStore.js";

const TextBox = () => {
  const {
    isFirstAi = false,
    isSecondAi = false,
    isThirdAi = false,
  } = useAuthStore();
  const [newPrompt ,setNewPrompt] = useState('')
  console.log(newPrompt.length)
  return (
    <div className="w-full h-4/12 flex flex-col justify-center items-center gap-2 ">
      <div className="w-full h-11/12   rounded-2xl  flex gap-2">
        <textarea className="w-2/3 h-full p-2 resize-none overflow-y-scroll custom-scroll  focus:outline-none focus:ring-0 border-2 border-gray-600  rounded-2xl "
        onChange={(e)=>{setNewPrompt(e.target.value)}}></textarea>
        <div className="w-1/3 h-full p-2 resize-none overflow-y-scroll custom-scroll  focus:outline-none focus:ring-0 border-2 border-gray-600 rounded-2xl "></div>
      </div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer
        
        disabled:cursor-not-allowed"
        disabled={!isFirstAi && !isSecondAi && !isThirdAi && newPrompt.length===0}
      >
        Generate
      </button>
    </div>
  );
};

export default TextBox;
