import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GuiColumnComponent} from './gui-column/gui-column.component';
import {InfoBlockComponent} from './info-block/info-block.component';
import {ChatComponent} from './chat/chat.component';
import {ChatMessageComponent} from './chat/chat-message/chat-message.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

import {ChatService} from '../chat.service';
import {CanvasViewComponent} from './canvas-view/canvas-view.component';
import {LoginComponent} from './login/login.component';
import {PlayComponent} from './play/play.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GuiColumnComponent,
    InfoBlockComponent,
    ChatComponent,
    ChatMessageComponent,
    CanvasViewComponent,
    LoginComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'play',
        component: PlayComponent
      }
    ])
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
