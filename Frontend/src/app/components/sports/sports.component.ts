import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {

  constructor(private sports : SportsService, private http : HttpClient) { }

  data : any = [];
  url = "http://localhost:3000/news?newsCategory=sports"; // placeholder 'https://jsonplaceholder.typicode.com/users' 

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get(this.url).subscribe((res)=>{
      this.data = res
      console.log(this.data)
    })
  }

  counter(i: number) {
    return new Array(i);
}

}
