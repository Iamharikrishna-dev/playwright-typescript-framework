import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf((info: winston.Logform.TransformableInfo) => {
  const { level, message, timestamp, stack } = info;
  return `${timestamp} [${level}]: ${stack || message}`;
});

/**
 * Shared logger for the framework.
 * - Console output is colorized for local runs.
 * - Everything also lands in logs/test.log so a CI run leaves a plain-text
 *   trail you can attach to a report or inspect after the fact.
 *
 * Set LOG_LEVEL (e.g. LOG_LEVEL=debug) to change verbosity; defaults to "info".
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    }),
    new winston.transports.File({ filename: 'logs/test.log' }),
  ],
});
