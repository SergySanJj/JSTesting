import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit, AfterViewInit {

  @Input() message: string;
  container: HTMLElement;

  constructor() {
  }

  ngOnInit() {
    this.container = document.getElementById('messagesContainer');
  }

  ngAfterViewInit(): void {
    this.container = document.getElementById('messagesContainer');
    this.container.scrollTop = this.container.scrollHeight;
  }

}
