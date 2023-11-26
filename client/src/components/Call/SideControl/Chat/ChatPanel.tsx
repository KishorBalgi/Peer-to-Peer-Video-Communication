"use client";
import React from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import Button from "@/components/Utils/Button";
import close_icon from "@/assets/icons/close.svg";
import FormWrapper from "@/components/Utils/FromWrapper";
import { sendInCallMessage } from "@/services/socket/chat.services";
import { IRootState } from "@/types/redux";
import { IFormCallbackResponse } from "@/types/general";

const ChatPanel = ({ close }: { close: () => void }) => {
  const { chats } = useSelector((state: IRootState) => state.chat);

  const handleSend = (data: FormData): IFormCallbackResponse => {
    const message = data.get("message") as string;
    if (message == "")
      return { status: "error", message: "Message cannot be empty" };
    sendInCallMessage(message);
    return { status: "success", message: "Message sent" };
  };

  return (
    <div className="w-[20vw] flex flex-col bg-white rounded-lg text-black h-[80vh] mx-5">
      <div className="h-fit flex justify-between items-center mb-1 px-5 py-2">
        <h1 className="text-xl font-semibold">Chats</h1>
        <Button
          buttonClassNames="!bg-gray-200 !p-1"
          buttonIcon={close_icon}
          onClick={close}
        />
      </div>
      <hr className="border-solid border-black" />
      <div className="px-2 h-full overflow-y-scroll">
        {chats.length === 0 && (
          <p className="text-center text-gray-500 my-5">No chats</p>
        )}
        {chats.map((chat, index) => (
          <Chat key={index} chat={chat} />
        ))}
      </div>
      <div className="bottom-0 my-2 px-2">
        <FormWrapper
          callback={handleSend}
          buttonText="Send"
          formClassNames="flex gap-1 justify-between items-center"
        >
          <input
            type="text"
            name="message"
            className="col-span-9 bg-gray-200 rounded-full focus:outline-none px-4 py-2 w-full"
            placeholder="Type a message"
          />
        </FormWrapper>
      </div>
    </div>
  );
};

export default ChatPanel;
