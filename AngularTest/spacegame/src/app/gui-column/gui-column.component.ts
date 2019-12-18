import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-gui-column',
  templateUrl: './gui-column.component.html',
  styleUrls: ['./gui-column.component.scss']
})
export class GuiColumnComponent implements OnInit {

  @Input()
  innerContentTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
