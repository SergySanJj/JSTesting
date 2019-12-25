import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {socketsURL} from './addresses/constants';
import {AuthService} from './app/auth.service';

export class ChatService {
  private url = socketsURL;
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(msg: string) {
    this.socket.emit('message', {message: msg, token: AuthService.token});
  }

  public getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
      this.socket.on('serverMessage', (message) => {
        console.log(JSON.parse(message));
        observer.next('SERVER: ' + JSON.parse(message));
      });
    });
  }
}
