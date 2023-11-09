import Image from "next/image";
import NavBar from "@/components/Layout/NavBar";
import Button from "@/components/Utils/Button";
import FormWrapper from "@/components/Utils/FromWrapper";

import hero from "@/assets/videoCom.png";
import initNewCall from "@/services/call/initNewCall";

export default function Home() {
  return (
    <main className="">
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
              <Button buttonTitle="New Call" />
              <FormWrapper
                callback={initNewCall}
                formClassNames="flex justify-center gap-2"
                buttonText="Join Call"
              >
                <input
                  className="glow rounded-full px-4 my-2 text-black outline-none"
                  type="text"
                  maxLength={9}
                  minLength={9}
                  placeholder="Enter Room ID"
                  required
                />
              </FormWrapper>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
