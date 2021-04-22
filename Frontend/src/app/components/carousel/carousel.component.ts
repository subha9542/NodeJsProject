import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  data: any = [];
  data_popular: any = [];
  url = 'http://localhost:3000/news';

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res) => {
      this.data = res;
      for (let c of this.data){
        if(c.newsCategory === 'popular')
          this.data_popular.push(c)
      }

    });
  }

  fetchData() {
    this.http.get(this.url).subscribe((res) => {
      this.data = res;
    });
  }

}
