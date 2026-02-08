export class Logger {
  static info(message: string, data?: any) {
    console.log(`[INFO] ${message}`, data ? JSON.stringify(data) : "");
  }

  static error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error ? error.message : "");
  }

  static warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data ? JSON.stringify(data) : "");
  }

  static debug(message: string, data?: any) {
    if (process.env.DEBUG) {
      console.log(`[DEBUG] ${message}`, data ? JSON.stringify(data) : "");
    }
  }
}
