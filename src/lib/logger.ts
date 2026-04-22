type LogLevel = "info" | "warn" | "error";

interface LogMeta {
  [key: string]: unknown;
}

function format(level: LogLevel, message: string, meta?: LogMeta) {
  return JSON.stringify({
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
  });
}

export const logger = {
  info(message: string, meta?: LogMeta) {
    console.info(format("info", message, meta));
  },
  warn(message: string, meta?: LogMeta) {
    console.warn(format("warn", message, meta));
  },
  error(message: string, meta?: LogMeta) {
    console.error(format("error", message, meta));
  },
};
