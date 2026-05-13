import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto-js';

class Hash {
  public static make = (str: string): string => {
    return bcrypt.hashSync(str, 10);
  };

  public static compare = (str: string, hash: string): boolean => {
    return bcrypt.compareSync(str, hash);
  };

  public static aesEncode = (str: string): string => {
    let key = process.env.AES_SECRET_KEY
      ? process.env.AES_SECRET_KEY
      : 'secret';
    return btoa(crypto.AES.encrypt(str, key).toString());
  };

  public static aesDecode = (str: string): string | null => {
    let key = process.env.AES_SECRET_KEY
      ? process.env.AES_SECRET_KEY
      : 'secret';

    try {
      return crypto.AES.decrypt(atob(str), key).toString(crypto.enc.Utf8);
    } catch (error) {
      return null;
    }
  };
}

export default Hash;
