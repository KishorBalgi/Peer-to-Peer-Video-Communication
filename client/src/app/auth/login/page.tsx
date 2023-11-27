"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import FormWrapper from "@/components/Utils/FromWrapper";
import hero from "@/assets/images/videoCom.png";
import { login } from "@/services/auth.services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IRootState } from "@/types/redux";
import NavBar from "@/components/Layout/NavBar";

const Login = () => {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user);

  useEffect(() => {
    // If user is logged in, redirect to home page
    if (user.id != "") router.push("/");
  }, []);

  return (
    <main>
      <NavBar />
      <div className="grid grid-cols-2 max-lg:grid-cols-1 w-full h-[100vh]  place-items-center">
        <div className="col-span-1">
          <Image src={hero} alt="hero" className=" w-3/5 h-auto mx-auto" />
        </div>
        <div className="col-span-1 mx-4">
          <div className="flex flex-col gap-2">
            <h1 className=" text-6xl font-bold">Video Chat</h1>
            <p className="text-xl font-semibold">
              Video chat with your friends and family with ease.
            </p>
            <div className="flex justify-center gap-2">
              <FormWrapper
                callback={login}
                router={router}
                formClassNames="flex flex-col gap-4 w-full text-black type-1"
                buttonClassNames="w-full"
                buttonText="Login"
              >
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-sm font-medium text-white"
                  >
                    Email address
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 p-2 w-full rounded-full outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 p-2 w-full rounded-full outline-none"
                  />
                </div>

                <p className="text-white text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/signup">
                    <span className="text-blue-500 cursor-pointer">
                      Sign up
                    </span>
                  </Link>
                </p>
              </FormWrapper>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
