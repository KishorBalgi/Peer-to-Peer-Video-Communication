import { Response } from "express";

// Util used to send response:
export const sendResponse = (res: Response, statusCode: number, data: any) => {
  // Set status:
  let status = "success";
  if (statusCode >= 400) {
    status = "error";
  } else if (statusCode >= 500) {
    status = "fail";
  }

  //   Filter out unwanted fields:
  if (data.password) delete data.password;

  res.status(statusCode).json({
    status: status,
    data,
  });
};
