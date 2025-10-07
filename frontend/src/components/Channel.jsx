import React from "react";
import { MdDelete } from "react-icons/md";
import { api } from "../utils/axiosInstance.js";
import { delChat } from "../utils/api.js";
const Channel = ({ headline, cid }) => {
  const deleteChannelByKey = async () => {
    try {
      const res = await api.post(delChat, {
        channelId: cid,
      });

      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <>
      <div className="group w-full  rounded-lg cursor-pointer p-2 flex justify-between items-center  hover:border-1 border-gray-600 ">
        {headline}
        <MdDelete
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={deleteChannelByKey}
        />
      </div>
    </>
  );
};

export default Channel;
