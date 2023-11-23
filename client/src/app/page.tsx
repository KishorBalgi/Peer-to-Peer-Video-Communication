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

  useEffect(() => {
    if (user.id !== "") socket.connect();
    else socket.disconnect();
  }, [user]);

  return (
    <main>
      <NavBar />
      <div className="grid grid-cols-2 max-lg:grid-cols-1 w-full h-[100vh] max-lg:h-[80vh] max-lg:my-20 place-items-center">
        <div className="col-span-1">
          <Image src={hero} alt="hero" className=" w-3/5 h-auto mx-auto" />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-2 mx-5">
            <h1 className="text-6xl max-md:text-3xl font-bold">Video Chat</h1>
            <p className="text-xl max-lg:md max-md:text-sm font-semibold">
              Video chat with your friends and family with ease.
            </p>
            <div className="flex max-md:flex-col justify-center gap-2">
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
                formClassNames="flex max-md:flex-col justify-center gap-2 type-0"
                buttonWrapperClassNames="flex max-md:justify-right"
                buttonText="Join Call"
              >
                <input
                  className="glow rounded-full px-4 max-md:py-2 my-2 text-black outline-none"
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
