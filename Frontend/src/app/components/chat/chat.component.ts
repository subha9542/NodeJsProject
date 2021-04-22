import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message:string = "";
  totalusers: any;
  username:string = "";
  loggedInUserName: string = "";
  messages: any[] = [];
  selectedUser = "";
  chatBoxToggle:boolean = false;
  
  constructor(private chatservice: ChatService) { }

  ngOnInit(): void {
    this.chatservice.chatMessages.subscribe((messages) => {
      this.messages = messages;
    })

    this.chatservice.totalUsers.subscribe((totalusers) => {
      this.totalusers = totalusers;
    })
  }

  sendMessage() {
    const dateSent = new Date();
    console.log(dateSent);
    this.chatservice.send(this.message, this.loggedInUserName, dateSent)
    this.message = "";
  }

  loginUser() {
    this.loggedInUserName=this.username;
    this.chatservice.login(this.loggedInUserName)
  }

  openChatBox() {
    this.chatBoxToggle = !this.chatBoxToggle;
  }

}
