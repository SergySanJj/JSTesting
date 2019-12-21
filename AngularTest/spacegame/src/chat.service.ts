import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {socketsURL} from './addresses/constants';

export class ChatService {
  private url = socketsURL;
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  public getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }
}
