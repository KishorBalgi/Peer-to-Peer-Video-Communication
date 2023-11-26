import { Request, Response, NextFunction } from "express";

// Util used to catch async errors:
const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
