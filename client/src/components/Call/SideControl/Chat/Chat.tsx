import { useSelector } from "react-redux";
import { IRootState, IChatMessage } from "@/types/redux";

const Chat = ({ chat }: { chat: IChatMessage }) => {
  const peer = useSelector((state: IRootState) =>
    state.call.remoteStreams.find((stream) => stream.peerId == chat.from)
  );

  return (
    <div className="flex flex-col gap-1 my-2">
      <h1 className="font-semibold">{peer?.user.name || "You"}</h1>
      <p className="text-justify text-sm ml-2">{chat.message}</p>
    </div>
  );
};

export default Chat;
