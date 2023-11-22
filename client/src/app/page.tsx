"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import NavBar from "@/components/Layout/NavBar";
import Button from "@/components/Utils/Button";
import FormWrapper from "@/components/Utils/FromWrapper";

import hero from "@/assets/images/videoCom.png";
import { initNewCall } from "@/services/socket/call.services";
import { socket } from "@/services/socket/socket.services";
import { toastMessage } from "@/components/Notifications/toasts";
import { isAuthenticated } from "@/services/auth.services";
import { IRootState } from "@/types/redux";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
    };
    checkAuth();
  }, []);

  return (
    <main>
      <NavBar />
      <div className="grid grid-cols-2 w-full h-[100vh]  place-items-center">
        <div className="col-span-1">
          <Image src={hero} alt="hero" className=" w-3/5 h-auto mx-auto" />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-2">
            <h1 className=" text-6xl font-bold">Video Chat</h1>
            <p className="text-xl font-semibold">
              Video chat with your friends and family with ease.
            </p>
            <div className="flex justify-center gap-2">
              <Button
                buttonClassNames="glow"
                buttonTitle="New Call"
                onClick={() => {
                  if (user.id == "") router.push("/auth/login");
                  else initNewCall(router);
                }}
              />
              <FormWrapper
                callback={(data: FormData) => {
                  const roomID = data.get("roomId") as string;
                  // validate roomID:
                  if (roomID.length !== 10) {
                    toastMessage({
                      type: "error",
                      message: "Invalid Room ID.",
                    });
                    return {
                      status: "error",
                      message: "Invalid Room ID.",
                    };
                  }
                  return {
                    status: "success",
                    message: null,
                    redirect: `/${roomID}`,
                  };
                }}
                router={router}
                formClassNames="flex justify-center gap-2 type-0"
                buttonText="Join Call"
              >
                <input
                  className="glow rounded-full px-4 my-2 text-black outline-none"
                  type="text"
                  minLength={10}
                  maxLength={10}
                  placeholder="Enter Room ID"
                  required
                  name="roomId"
                />
              </FormWrapper>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
