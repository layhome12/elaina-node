import Dates from "./date.helper";

class Logger {
  private static isProd = process.env.NODE_ENV === "production";

  private static time() {
    return Dates.format("YYYY-MM-DD HH:mm:ss");
  }

  public static info(message: string, ...optional: any[]) {
    if (this.isProd) {
      return;
    }

    console.log(`[${this.time()}][INFO] ${message}`, ...optional);
  }

  public static success(message: string, ...optional: any[]) {
    if (this.isProd) {
      return;
    }

    console.log(`[${this.time()}][SUCCESS] ${message}`, ...optional);
  }

  public static warn(message: string, ...optional: any[]) {
    if (this.isProd) {
      return;
    }

    console.log(`[${this.time()}][WARN] ${message}`, ...optional);
  }

  public static error(message: string, error?: any) {
    console.error(`[${this.time()}][ERROR] ${message}`);

    if (error) {
      console.error(error);
    }
  }
}

export default Logger;
