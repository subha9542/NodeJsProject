import { Injectable } from '@angular/core';
import {io, Socket} from "socket.io-client";
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: Socket;

  chatMessages: BehaviorSubject<any> = new BehaviorSubject([]);
  totalUsers: BehaviorSubject<any> = new BehaviorSubject({total: 0, names:[]});

  constructor() { 
    //Connect to socket io server
    this.socket = io("http://localhost:5000");
  }

  login(username:string) {
    //the name "chat" should be the same as on server side for sending..
    this.socket.emit("login", username);
  }

  //method to send a message to friends
  send(message:string, user:string, date:Date) {
    //the name "chat" should be the same as on server side for sending..
    this.socket.emit("chat", {message, user, date});
    this.chatMessages.next([...this.chatMessages.value, {message: message, user: user, date:date, self: true}])
  }

  receive(){
    this.socket.on("message", (message)=> {
      console.log("MESSAGE: " + message)
      //add new message to the chatMessages
      this.chatMessages.next([...this.chatMessages.value, {message: message.message, user: message.user, date:message.date, self: false}])
    })

    this.socket.on("totalusers", (message)=> {
      //add new message to the chatMessages
      console.log("TOTAL: " + message)
      this.totalUsers.next(message)
    })
  }
}
