import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatInputValue: string;

  @Input()
  messages: Array<string>;

  @Input()
  messageSendHandler: ChatService;

  constructor() {
  }


  ngOnInit() {
  }


  keyPress(e: any) {
    // console.log('keypress', e);
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }


  sendMessage() {
    const text = this.chatInputValue;
    if (text !== '') {
      console.log('message', text);
      this.messageSendHandler.sendMessage(text);
    }
    this.chatInputValue = '';
  }
}
