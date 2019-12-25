import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../chat.service';
import {Game} from '../../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  messages: Array<string> = [];
  public chatService: ChatService;
  public game: Game;

  constructor() {
    this.chatService = new ChatService();
    this.game = new Game();
  }

  ngOnInit(): void {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

}
