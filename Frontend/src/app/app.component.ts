import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HotWire';

  constructor(private chatServer:ChatService) {
    this.chatServer.receive();
  }
}
