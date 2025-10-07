import React, { useEffect, useState } from "react";
import { useAuthStore } from "../utils/zustandStore.js";
import AiResBox from "./AiResBox.jsx";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { channelAllMessages, newPromptQuery } from "../utils/api.js";
import { api } from "../utils/axiosInstance.js";
import { useNavigate, useParams } from "react-router";
const TextBox = () => {
  const {
    isFirstAi = false,
    isSecondAi = false,
    isThirdAi = false,
  } = useAuthStore();
  const [newPrompt, setNewPrompt] = useState("");
  // const notify = () =>
  //   toast.warn("hello");

  const [allMessages, setAllMessages] = useState([]);

  const { channelId: urlChannelId } = useParams();
  const [channelId, setChannelId] = useState(urlChannelId || null);
  const navigate = useNavigate();

  const callNewPromptQuery = async () => {
    try {
      const res = await api.post(newPromptQuery + `/${channelId || ""}`, {
        prompt: newPrompt,
        isFirstAi: isFirstAi,
        isSecondAi: isSecondAi,
        isThirdAi: isThirdAi,
      });

      console.log("res", res);

      const newChannelId = res?.channelId;
      const isNewChannel = res?.isNewChannel;
      if (isNewChannel && newChannelId) {
        setChannelId(newChannelId);
        navigate(`/${newChannelId}`);
      }
      if (!channelId) return;
      const fetchAllMessages = async () => {
        try {
          const msgRes = await api.post(channelAllMessages + `/${channelId}`);
          setAllMessages(msgRes);
          console.log("msgres" , msgRes);
        } catch (error) {
          toast.warn(error);
        }
      };
      fetchAllMessages();
    } catch (error) {
      toast.warn(error);
    }
  };
  // console.log(allMessages)

  return (
    <>
      <div className="w-full h-4/12 flex flex-col justify-center items-center gap-2 ">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <div className="w-full h-11/12   rounded-2xl  flex gap-2">
          <textarea
            className="w-2/3 h-full p-2 resize-none overflow-y-scroll custom-scroll  focus:outline-none focus:ring-0 border-2 border-gray-600  rounded-2xl "
            onChange={(e) => {
              setNewPrompt(e.target.value);
            }}
          ></textarea>
          <div className="w-1/3 h-full p-2 resize-none overflow-y-scroll custom-scroll  focus:outline-none focus:ring-0 border-2 border-gray-600 rounded-2xl "></div>
        </div>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer
        
        disabled:cursor-not-allowed"
          disabled={
            !isFirstAi && !isSecondAi && !isThirdAi && newPrompt.length === 0
          }
          onClick={callNewPromptQuery}
        >
          Generate
        </button>
      </div>
      <AiResBox
        firstAiRes={
          "hello there 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ab veritatis, nulla ipsum maxime numquam fugit animi iusto dolore magni temporibus eius eligendi commodi minus delectus placeat itaque laborum? Inventore facere nobis sit id voluptate nostrum nam quia, reprehenderit quasi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ab veritatis, nulla ipsum maxime numquam fugit animi iusto dolore magni temporibus eius eligendi commodi minus delectus placeat itaque laborum? Inventore facere nobis sit id voluptate nostrum nam quia, reprehenderit quasi!"
        }
        secondAiRes={"hello there 2"}
        thirdAiRes={"hello there 3"}
      />
    </>
  );
};

export default TextBox;
