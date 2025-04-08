import { Injectable, Scope } from '@nestjs/common';
import { LogFileService } from './log-file.service';

@Injectable({ scope: Scope.REQUEST })
export class LogService {
  private user: any;

  constructor(private readonly logFileService: LogFileService) {}

  setUser(user: any) {
    this.user = user;
    console.log('USER - SET', user);
  }

  removeUser() {
    this.user = undefined;
    console.log('USER - REMOVED');
  }

  create({
    level,
    context,
    message,
  }: {
    level: string;
    message: string;
    context: string;
  }) {
    console.log('CREATE -', message);
    const log = {
      user: this.user,
      level,
      context,
      message,
      timestamp: new Date().toISOString(),
    };

    this.logFileService.write(JSON.stringify(log));
  }
}
