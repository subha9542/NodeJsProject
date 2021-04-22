import { Component, OnInit, Inject, HostListener } from '@angular/core';

import { SportsService } from 'src/app/services/sports.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  mybutton = document.getElementById('myBtn');
  constructor(private news: SportsService, private http: HttpClient) {}

  data: any = [];
  data_popular: any = [];
  url = 'http://localhost:3000/news';

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res) => {
      this.data = res;
      for (let c of this.data) {
        if (c.newsCategory === 'popular') this.data_popular.push(c);
      }
    });
  }

  fetchData() {
    this.http.get(this.url).subscribe((res) => {
      this.data = res;
    });
  }
  scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      this.mybutton.style.display = 'block';
    } else {
      this.mybutton.style.display = 'none';
    }
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  
}
