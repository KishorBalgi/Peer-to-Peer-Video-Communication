"use client";
import React from "react";
import { useSelector } from "react-redux";
import Button from "@/components/Utils/Button";
import close_icon from "@/assets/icons/close.svg";
import { IRootState } from "@/types/redux";

const ParticipantsPanel = ({ close }: { close: () => void }) => {
  const participants = useSelector(
    (state: IRootState) => state.call.remoteStreams
  );

  return (
    <div className="w-[20vw] flex flex-col bg-white rounded-lg text-black h-[80vh] mx-5">
      <div className="h-fit flex justify-between items-center mb-1 px-5 py-2">
        <h1 className="text-xl font-semibold">Participants</h1>
        <Button
          buttonClassNames="!bg-gray-200 !p-1"
          buttonIcon={close_icon}
          onClick={close}
        />
      </div>
      <hr className=" border-solid border-black" />
      <div className="px-2 h-full overflow-y-scroll">
        {participants.length === 0 && (
          <p className="text-center text-gray-500 my-5">No participants</p>
        )}
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center gap-2 my-2 p-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 1C8.14 1 5 4.14 5 8C5 11.86 8.14 15 12 15C15.86 15 19 11.86 19 8C19 4.14 15.86 1 12 1ZM12 17C7.03 17 2.88 20.74 2.12 21.33C2.04 21.39 1.97 21.45 1.91 21.51C1.5 21.85 1.5 22.47 1.91 22.82C2.32 23.16 2.98 23.16 3.39 22.82C3.49 22.71 7.64 18 12 18C16.36 18 20.51 22.71 20.61 22.82C21.02 23.16 21.68 23.16 22.09 22.82C22.5 22.47 22.5 21.85 22.09 21.51C21.32 20.72 16.97 17 12 17Z"
                    fill="#333333"
                  />
                </g>
              </svg>
            </div>
            <h1 className="text-lg">{participant.user.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsPanel;
