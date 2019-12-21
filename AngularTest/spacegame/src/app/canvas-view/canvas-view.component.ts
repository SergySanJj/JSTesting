import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Game} from '../../game.service';

@Component({
  selector: 'app-canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.scss']
})
export class CanvasViewComponent implements OnInit, AfterViewInit {
  @Input()
  game: Game;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.game.setCanvas(document.getElementById('webglOutput'));
  }

}
