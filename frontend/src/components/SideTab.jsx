import React, { useEffect } from "react";
import Channel from "./Channel";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { api } from "../utils/axiosInstance";
import { allChnnels } from "../utils/api.js";
const SideTab = () => {
  const [isOpen, setIsOpen] = useState(true);
  const UserId = JSON.parse(sessionStorage.getItem("auth-storage"))?.state
    ?.userId;
  const [allChannles, setAllChannles] = useState([]);
  const callAllChannels = async () => {
    try {
      const res = await api.post(allChnnels, {
        userId: UserId,
      });

      setAllChannles(res.channels);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  useEffect(() => {
    callAllChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserId]);
  console.log(allChannles);
  return (
    <div className={`flex  `}>

      <aside
        className={`h-[calc(100vh-75px)] bg-gray-900 mt-[75px] transition-all duration-300 ${
          isOpen ? "w-64" : "w-8"
        }
      flex flex-col items-end p-2 gap-2
        `}
      >
        <button onClick={() => setIsOpen(!isOpen)} className=" text-white ">
          {isOpen ? <RxCross1 /> : <GiHamburgerMenu />}
        </button>

        {isOpen && (
          <div className="w-full">
            {allChannles?.map((channels) => {
              return (
                <Channel
                  headline={channels._id}
                  key={channels._id}
                  cid={channels._id}
                />
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
};

export default SideTab;
