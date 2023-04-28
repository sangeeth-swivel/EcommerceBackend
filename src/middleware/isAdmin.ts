import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = res.locals.user.isAdmin;

  if (!isAdmin) {
    return res.sendStatus(403);
  }

  return next();
};

export default isAdmin;
