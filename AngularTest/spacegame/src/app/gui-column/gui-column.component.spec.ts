import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiColumnComponent } from './gui-column.component';

describe('GuiColumnComponent', () => {
  let component: GuiColumnComponent;
  let fixture: ComponentFixture<GuiColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
