import { Request, Response } from "express";
import config from "config";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  console.log("after create session");
  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: "1d" }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: "1y" }
  );

  console.log("after createating tokens");
  // return access & refresh tokens
  // res.cookie("accessToken", accessToken, {
  //   maxAge: 300000, // 5 minutes
  //   sameSite: "none",
  //   secure: true,
  // });
  // res.cookie("refreshToken", refreshToken, {
  //   maxAge: 300000, // 5 minutes
  //   sameSite: "none",
  //   secure: true,
  // });
  // res.setHeader("Access-Control-Allow-Origin", "https://handcraft.vercel.app");

  return res.send({ accessToken, refreshToken });
};

const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
};

const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};

export {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
};
