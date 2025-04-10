import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogFileService implements OnModuleDestroy {
  private logStream: any;
  private day: string;
  private logDir: string;
  private logFileName: string;
  private logFilePath: string;

  constructor() {
    this.day = new Date().toISOString().split('T')[0];
    this.logDir = path.join(process.cwd(), 'logs', this.day);
    this.logFileName = 'logs.log';
    this.logFilePath = path.join(this.logDir, this.logFileName);

    this.openStream();
  }

  onModuleDestroy() {
    this.closeStream();
  }

  openStream() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    this.logStream = fs.createWriteStream(this.logFilePath, {
      flags: 'a',
    });
  }

  closeStream() {
    if (this.logStream) {
      this.logStream.end();
    }
  }

  write(log: string) {
    const currentDay = new Date().toISOString().split('T')[0];

    if (this.day !== currentDay) {
      this.closeStream();
      this.day = currentDay;
      this.logDir = path.join(process.cwd(), 'logs', this.day);
      this.logFilePath = path.join(this.logDir, this.logFileName);
      this.openStream();
    }

    this.logStream.write(`${log}\n`);
  }
}
