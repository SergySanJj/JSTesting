import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GuiColumnComponent } from './gui-column/gui-column.component';
import { InfoBlockComponent } from './info-block/info-block.component';

@NgModule({
  declarations: [
    AppComponent,
    GuiColumnComponent,
    InfoBlockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
