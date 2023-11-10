import ControlPanel from "@/components/Call/ControlPanel";
import SideControlPanel from "@/components/Call/SideControl/SideControlPanel";
import VideoGrid from "@/components/Call/Participants Grid/VideoGrid";

export default async function CallPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="flex justify-between items-center w-[100vw]">
        <VideoGrid />
        <SideControlPanel />
      </div>
      <ControlPanel />
    </div>
  );
}
