"use client";
import React, { useState } from "react";
import Button from "@/components/Utils/Button";
import close_icon from "@/assets/icons/close.svg";

const ParticipantsPanel = ({ close }: { close: () => void }) => {
  return (
    <div className="w-[20vw] bg-white rounded-lg text-black h-[80vh] mx-5 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold">Participants</h1>
        <Button
          buttonClassNames="!bg-gray-200 !p-1"
          buttonIcon={close_icon}
          onClick={close}
        />
      </div>
      <hr className=" border-solid border-black" />
      <div className="my-5">
        <p>Kishor Balgi</p>
        <p>Ramesh Kulkarni</p>
        <p>Vikram Rathore</p>
        <p>Bing Chilling</p>
      </div>
    </div>
  );
};

export default ParticipantsPanel;
