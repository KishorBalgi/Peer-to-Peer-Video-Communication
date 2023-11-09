"use client";
import React, { useTransition } from "react";
import Button from "./Button";

type Props = {
  children: JSX.Element | JSX.Element[];
  formClassNames?: string;
  buttonWrapperClassNames?: string;
  buttonClassNames?: string;
  buttonText?: string;
  callback: (props: FormData) => void;
};

const FormWrapper = ({
  children,
  formClassNames,
  buttonWrapperClassNames,
  buttonClassNames,
  buttonText = "Submit",
  callback,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      action={(props) => {
        startTransition(async () => {
          const res = await callback(props);
        });
      }}
      className={formClassNames}
    >
      {children}
      <div className={buttonWrapperClassNames}>
        <Button
          buttonClassNames="glow"
          buttonTitle={buttonText}
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default FormWrapper;
