import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

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
  messageSendHandler: ChatComponent;

  constructor() {
  }

  ngOnInit() {
  }


  keyPress(e: any) {
    // console.log('keypress', e);
    if (e.key === 'Enter') {
      this.sendMessage(this.chatInputValue);
      this.chatInputValue = '';
    }
  }

  sendMessage(text: string) {
    if (text !== '') {
      console.log('message', text);
      this.messageSendHandler.sendMessage(text);
    }
  }
}
