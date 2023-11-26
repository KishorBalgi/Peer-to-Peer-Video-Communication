"use client";
import React, { useState } from "react";
import chat from "@/assets/icons/chat.svg";
import participants from "@/assets/icons/participants.svg";
import info from "@/assets/icons/info.svg";

import Button from "@/components/Utils/Button";
import InfoPanel from "./InfoPanel";
import ChatPanel from "./Chat/ChatPanel";
import ParticipantsPanel from "./Participants/ParticipantsPanel";

const SideControlPanel = () => {
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handlePanelDisplay = (
    panel: "chat" | "participants" | "info" | "close"
  ) => {
    setShowChat(false);
    setShowParticipants(false);
    setShowInfo(false);

    switch (panel) {
      case "chat":
        setShowChat(true);
        break;
      case "participants":
        setShowParticipants(true);
        break;
      case "info":
        setShowInfo(true);
        break;
      case "close":
        break;
    }
  };

  return (
    <div className="flex items-center mr-3">
      <div className="flex flex-col gap-2 w-max">
        <Button
          buttonIcon={chat}
          buttonClassNames={`!p-2 m-0 ${showChat ? "" : "!bg-gray-100"}`}
          onClick={() => handlePanelDisplay("chat")}
        />
        <Button
          buttonIcon={participants}
          buttonClassNames={`!p-2  m-0 ${
            showParticipants ? "" : "!bg-gray-100"
          }`}
          onClick={() => handlePanelDisplay("participants")}
        />
        <Button
          buttonIcon={info}
          buttonClassNames={`!p-2 m-0 ${showInfo ? "" : "!bg-gray-100"}`}
          onClick={() => handlePanelDisplay("info")}
        />
      </div>
      {/* Display Panel */}
      <div>
        {showChat && <ChatPanel close={() => handlePanelDisplay("close")} />}
        {showParticipants && (
          <ParticipantsPanel close={() => handlePanelDisplay("close")} />
        )}
        {showInfo && <InfoPanel close={() => handlePanelDisplay("close")} />}
      </div>
    </div>
  );
};

export default SideControlPanel;
