import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logFilePath: string;
  private readonly logLevel: string;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';

    const logDir = isProduction
      ? path.join(__dirname, 'logs')
      : path.join(__dirname, '..', 'logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.logFilePath = path.join(logDir, 'app.log');

    this.logLevel = process.env.LOG_LEVEL || 'info';
  }

  private writeLog(message: string, level: string) {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

      console.log(logMessage);

      fs.appendFileSync(this.logFilePath, logMessage);
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
