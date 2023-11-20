import { toast, TypeOptions, ToastOptions, Id } from "react-toastify";

const toastOptions: ToastOptions = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const toastMessage = ({
  type,
  message,
}: {
  type: "success" | "error" | "info" | "warn";
  message: string;
}) => {
  toast[type](message, toastOptions);
};

export const toastLoading = (message: string): Id => {
  return toast.loading(message, toastOptions);
};

export const toastUpdate = (
  id: Id,
  type: TypeOptions,
  message: string,
  isLoading: boolean = true
) => {
  toast.update(id, {
    render: message,
    type: type,
    isLoading,
    ...toastOptions,
  });
};
