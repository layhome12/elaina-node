import jwt, { SignOptions } from "jsonwebtoken";

class Auth {
  public static jwtSign = (payload: JwtPayload, expIn: string): string => {
    const secret = process.env.JWT_SECRET_KEY ?? "secret";

    const options: SignOptions = {
      expiresIn: expIn as SignOptions["expiresIn"],
    };

    return jwt.sign(payload as object, secret, options);
  };

  public static jwtRefresh = (payload: JwtPayload, expIn: string): string => {
    const key =
      (process.env.JWT_SECRET_KEY ?? "secret") +
      (process.env.JWT_SALT_KEY ?? "salt");

    const options: SignOptions = {
      expiresIn: expIn as SignOptions["expiresIn"],
    };

    return jwt.sign(payload as object, key, options);
  };

  public static isInsider = (payload: JwtPayload): boolean => {
    const insider: number[] = [1, 2];
    return insider.includes(payload.gid);
  };
}

export default Auth;
