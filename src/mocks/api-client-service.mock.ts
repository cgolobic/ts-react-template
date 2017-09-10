import { Observable, BehaviorSubject } from 'rxjs';
export class MockApiClient {
  _getMessageResult: string = '';

  public message: BehaviorSubject<string> = new BehaviorSubject(undefined);

  public async getMessage(...args) {
    this.message.next(this._getMessageResult);
  } 
}