import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages: Array<string> = [];

  ngOnInit(): void {
  }

  sendMessage(msg: string) {
    console.log('message sent to server');
    this.messages.push(msg);
  }
}
