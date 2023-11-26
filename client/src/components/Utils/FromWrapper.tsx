"use client";
import React, { useTransition, useRef } from "react";
import Button from "./Button";
import { toastLoading, toastUpdate } from "../Notifications/toasts";
import { IFormCallbackResponse } from "@/types/general";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect } from "next/dist/server/api-utils";

type Props = {
  children: JSX.Element | JSX.Element[];
  formClassNames?: string;
  buttonWrapperClassNames?: string;
  buttonClassNames?: string;
  buttonText?: string;
  callback: (
    props: FormData
  ) => IFormCallbackResponse | Promise<IFormCallbackResponse>;
  router?: AppRouterInstance;
};

const FormWrapper = ({
  children,
  formClassNames,
  buttonWrapperClassNames,
  buttonClassNames,
  buttonText = "Submit",
  callback,
  router,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  return (
    <form
      ref={formRef}
      // Submit handler:
      action={(props) => {
        let toastId: number | string;
        if (formRef.current?.classList.contains("type-1")) {
          toastId = toastLoading("Loading...");
        }

        
        startTransition(async () => {
          const res = await callback(props);

          if (res.status === "success") {
            toastUpdate(toastId, "success", res.message as string, false);
            formRef.current?.reset();
            if (res.redirect) {
              router?.push(res.redirect);
            }
          } else {
            toastUpdate(toastId, "error", res.message as string, false);
          }
        });
      }}
      className={formClassNames}
    >
      {children}
      <div className={buttonWrapperClassNames}>
        <Button
          buttonClassNames={`glow ${buttonClassNames}`}
          buttonTitle={buttonText}
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default FormWrapper;
