import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logFilePath: string;
  private readonly errorLogFilePath: string;
  private readonly logLevel: string;

  constructor() {
    const logDir =
      process.env.NODE_ENV === 'production'
        ? path.join(__dirname, 'logs')
        : path.join(__dirname, '../../logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.logFilePath = path.join(logDir, 'app.log');
    this.errorLogFilePath = path.join(logDir, 'error.log');
    this.logLevel = process.env.LOG_LEVEL || 'info';
  }

  private writeLog(message: string, level: string) {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

      console.log(logMessage);

      this.appendToLogFile(
        logMessage,
        level === 'error' ? this.errorLogFilePath : this.logFilePath,
      );
    }
  }

  private appendToLogFile(message: string, logFilePath: string) {
    try {
      if (
        fs.existsSync(logFilePath) &&
        fs.statSync(logFilePath).size >
          parseInt(process.env.MAX_LOG_FILE_SIZE || '10485760', 10)
      ) {
        const newFilePath = `${logFilePath}.${new Date()
          .toISOString()
          .replace(/[:.]/g, '-')}`;
        fs.renameSync(logFilePath, newFilePath);
      }
      fs.appendFileSync(logFilePath, message);
    } catch (error) {
      console.error('Error writing log file:', error);
    }
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  log(message: string) {
    this.writeLog(message, 'info');
  }

  error(message: string, trace?: string) {
    this.writeLog(`${message}\n${trace || ''}`, 'error');
  }

  warn(message: string) {
    this.writeLog(message, 'warn');
  }

  debug(message: string) {
    this.writeLog(message, 'debug');
  }

  verbose(message: string) {
    this.writeLog(message, 'verbose');
  }
}
