import React from "react";
import SideTab from "../components/SideTab";
import Header from "../components/Header";
import TextBox from "../components/TextBox";
import AiResBox from "../components/AiResBox";
import Toggler from "../components/Toggler";

const Home = () => {
  return (
    <div className="bg-gray-800 w-min-screen h-min-screen">
      <Header />
      <div className="flex ">
        <SideTab />
        <div className=" mt-[75px] w-full mx-2" >
          <Toggler />
          <TextBox />
        </div>
      </div>
    </div>
  );
};

export default Home;
