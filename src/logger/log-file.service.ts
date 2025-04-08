import { Injectable, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable({ scope: Scope.REQUEST })
export class LogFileService {
  private logStream: any;
  private logDir: string = path.join(process.cwd(), 'logs'); // Alterado para a raiz do projeto
  private logFileName = 'logs.log';
  private logFilePath: string = path.join(this.logDir, this.logFileName);

  constructor() {
    this.openStream();
  }

  openStream() {
    console.log('STREAM - OPEN');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    this.logStream = fs.createWriteStream(this.logFilePath, {
      flags: 'a',
    });
  }

  closeStream() {
    console.log('STREAM - CLOSE');
    if (this.logStream) {
      this.logStream.end();
    }
  }

  write(log: string) {
    this.logStream.write(`${log}\n`);
  }
}
