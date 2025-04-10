import { Injectable, Scope } from '@nestjs/common';
import { LogFileService } from './log-file.service';

@Injectable({ scope: Scope.REQUEST })
export class LogService {
  private user: any;
  private request: any;

  constructor(private readonly logFileService: LogFileService) {}

  setUser(user: any) {
    this.user = user;
  }

  setRequest(request: any) {
    this.request = {
      method: request.method,
      url: request.url,
      headers: request.headers,
      params: request.params,
      query: request.query,
      body: request.body,
      ip: request.ip,
      hostname: request.hostname,
    };
  }

  create({
    level,
    context,
    message,
    data = {},
  }: {
    level: string;
    message: string;
    context: string;
    data?: any;
  }) {
    const log = {
      data,
      message,
      user: this.user,
      request: this.request,
      level,
      context,
      timestamp: new Date().toISOString(),
    };

    this.logFileService.write(JSON.stringify(log));
  }
}
