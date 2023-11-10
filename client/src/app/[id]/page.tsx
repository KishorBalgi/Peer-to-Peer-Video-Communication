import ControlPanel from "@/components/Call/ControlPanel";
import SideControlPanel from "@/components/Call/SideControl/SideControlPanel";

export default async function CallPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Call</h1>
      <p>This is the call page.</p>
      <SideControlPanel />
      <ControlPanel />
    </div>
  );
}
