import * as crypto from 'crypto';

class Random {
  public static string = (byte: number = 4): string => {
    return crypto.randomBytes(byte).toString('hex');
  };
}

export default Random;
