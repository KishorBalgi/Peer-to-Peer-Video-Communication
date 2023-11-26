"use client";
import React, { useState } from "react";
import Button from "@/components/Utils/Button";
import close_icon from "@/assets/icons/close.svg";
import { socket } from "@/services/socket/socket.services";

const InfoPanel = ({ close }: { close: () => void }) => {
  return (
    <div className="w-[20vw] flex flex-col bg-white rounded-lg text-black h-[80vh] mx-5">
      <div className="h-fit flex justify-between items-center mb-1 px-5 py-2">
        <h1 className="text-xl font-semibold">Meeting Info</h1>
        <Button
          buttonClassNames="!bg-gray-200 !p-1"
          buttonIcon={close_icon}
          onClick={close}
        />
      </div>
      <hr className=" border-solid border-black" />
      <div className="my-5 px-2">
        <h1>Meeting ID:</h1>
        <p className="text-blue-500 text-sm py-2">{`${socket.callId}`}</p>
        <h1>Meeting Link:</h1>
        <p className="text-blue-500 text-sm py-2">{`${window.location.origin}/${socket.callId}`}</p>
      </div>
    </div>
  );
};

export default InfoPanel;
