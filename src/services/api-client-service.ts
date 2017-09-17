import { LoggerService } from './logger-service';
import { Inject } from '../di/inject';
import { Observable, BehaviorSubject } from 'rxjs';

@Inject()
export class ApiClient {
  public message: BehaviorSubject<string> = new BehaviorSubject(undefined);
  constructor (private _loggerService: LoggerService) { }

  public async getMessage() {
    try {
      let msg = await this._fetchMessage();
      this.message.next(msg);
    } catch (error) {
      this._loggerService.logMessage(`Failed to get message. Error: ${error}`);
    }
  }

  private async _fetchMessage(): Promise<string> {
    return 'Hello World!';
  }
}