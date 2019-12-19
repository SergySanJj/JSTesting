import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private leftCol;
  private rightCol;
  messages: Array<string> = ['fdsf', 'ffff', 'fdsfsdfdsfds', 'fdsfdsfsdfds', 'fdsfdsfdsfds', 'fdfdsfdsfds'];

  ngOnInit(): void {
    this.leftCol = document.getElementById('left-col');
    this.rightCol = document.getElementById('right-col');
  }
}
