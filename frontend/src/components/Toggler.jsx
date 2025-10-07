import React from "react";
import { useAuthStore } from "../utils/zustandStore.js";

const Toggler = () => {
  const {
    isFirstAi,
    toggleFirstAi,
    isSecondAi,
    toggleSecondAi,
    isThirdAi,
    toggleThirdAi,
  } = useAuthStore();

  return (
    <>
      <div className="flex justify-center items-center gap-6 m-5">
        <div className="flex justify-center items-center gap-4 ">
          <div>
            <p className=" text-xl font-bold">gemini 2.5</p>
          </div>
          <div>
            <label class="switch">
              <input
                type="checkbox"
                checked={isFirstAi}
                onChange={toggleFirstAi}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 ">
          <div>
            <p className=" text-xl font-bold">gpt5</p>
          </div>
          <div>
            <label class="switch">
              <input
                type="checkbox"
                checked={isSecondAi}
                onChange={toggleSecondAi}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 ">
          <div>
            <p className=" text-xl font-bold">claude 4</p>
          </div>
          <div>
            <label class="switch">
              <input
                type="checkbox"
                checked={isThirdAi}
                onChange={toggleThirdAi}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toggler;
