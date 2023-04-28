import jwt from "jsonwebtoken";
import config from "config";

const privateKey = process.env.privateKey || config.get<string>("privateKey");
const publickey = process.env.publicKey || config.get<string>("publicKey");

const signJwt = (object: object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publickey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};

export { signJwt, verifyJwt };
