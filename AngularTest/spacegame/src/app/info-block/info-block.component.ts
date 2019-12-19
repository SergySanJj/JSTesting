import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss']
})
export class InfoBlockComponent implements OnInit {
  @Input()
  display = true;

  @Input()
  infoBlockName: string;

  @Input()
  infoTemplate: TemplateRef<any>;


  constructor() {
  }

  ngOnInit() {
  }

}
