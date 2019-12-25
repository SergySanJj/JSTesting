import {Component, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {Game} from '../game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }

}
