"use client";
import React, { useState } from "react";
import Button from "@/components/Utils/Button";
import close_icon from "@/assets/icons/close.svg";
import FormWrapper from "@/components/Utils/FromWrapper";

const ChatPanel = ({ close }: { close: () => void }) => {
  return (
    <div className="relative w-[20vw] bg-white rounded-lg text-black h-[80vh] mx-5">
      <div className="flex justify-between items-center mb-5 p-5">
        <h1 className="text-xl font-semibold">Chats</h1>
        <Button
          buttonClassNames="!bg-gray-200 !p-1"
          buttonIcon={close_icon}
          onClick={close}
        />
      </div>
      <hr className="border-solid border-black" />
      <div className="my-5 p-5">
        <p>Hello</p>
      </div>
      <div className="absolute bottom-0 my-2 px-2">
        <FormWrapper
          callback={() => console.log("Chat Send")}
          buttonText="Send"
          formClassNames="flex gap-1 justify-between items-center"
        >
          <input
            type="text"
            className="col-span-9 bg-gray-200 rounded-full focus:outline-none px-4 py-2 w-full"
            placeholder="Type a message"
          />
        </FormWrapper>
      </div>
    </div>
  );
};

export default ChatPanel;
