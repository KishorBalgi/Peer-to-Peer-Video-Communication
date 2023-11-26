import { getAllCalls, deleteCallById } from "../services/call.services";

// Remove older calls node-cron job:
export const removeOlderCalls = async () => {
  console.log("Cron job: Removing older calls");
  const calls = await getAllCalls();

  if (calls.length > 0) {
    calls.forEach(async (call) => {
      const callDate = new Date(call.createdAt);
      const currentDate = new Date();
      const diff = currentDate.getTime() - callDate.getTime();
      const diffInDays = diff / (1000 * 3600 * 24);
      if (diffInDays > 5) {
        await deleteCallById(call.callId);
      }
    });
  }
};
