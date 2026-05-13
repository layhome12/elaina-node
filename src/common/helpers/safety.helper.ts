import * as fs from 'fs';
import * as rimraf from 'rimraf';

class Safety {
  public static number = (str: string | number | null): number => {
    if (!str) return 0;

    // Number
    const numStr = str.toString().replace(/[^0-9]/g, '');
    if (numStr == '') return 0;

    return parseInt(numStr);
  };

  public static arrayEqual = (a: Array<any>, b: Array<any>): boolean => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };

  public static storageDir = (
    path: string,
    cb: (dir: string) => void,
  ): void => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    cb(path);
  };

  public static forceDelete = (dir: string) => {
    let isDeleted = false;
    while (!isDeleted) {
      try {
        rimraf.sync(dir, {
          glob: true,
        });

        isDeleted = true;
      } catch (error) {
        isDeleted = false;
      }
    }
  };
}

export default Safety;
