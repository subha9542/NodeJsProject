import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  //socket : Socket;
  //sportsNews : BehaviorSubject<any> = new BehaviorSubject([]);
  data: any = [];
  url = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {
    //this.socket = io("http://localhost:3000/news");
  }

  fetchData() {
    return this.http.get(this.url);
  }

  getNewsById(id) {
    return this.http.get(this.url + '/' + id);
  }

  deleteNews(id) {
    return this.http.delete(this.url + '/' + id);
  }

  ngOnInit() {
    return this.fetchData();
  }

  // recieve() {
  //   this.socket.on("/news", () => {
  //     this.sportsNews.next()
  //   })
  // }
}
