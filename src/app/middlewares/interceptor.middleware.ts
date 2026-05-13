import { Request, Response, NextFunction } from "express";

export function Interceptor(callback: (req: Request, res: Response) => void) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      try {
        // -- code: 200, 201
        if ([200, 201].includes(res.statusCode)) {
          callback(req, res);
        }
      } catch (err) {
        // -- nothing
      }
    });

    next();
  };
}
