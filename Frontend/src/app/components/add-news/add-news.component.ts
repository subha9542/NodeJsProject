import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  model:any = {}
  newsCategories = ['sports', 'world','popular','editos','others']
  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

  addNews() {
    let data: any = this.model;
    this.http.post('http://localhost:3000/news/addNews', data).subscribe(
      (response: any) => {
        //console.log(response.message);
        this.router.navigate(['/news-list',{messages : response.message}]);
      },
      (error) => {
        console.log(error.error.error);
      }
        );
      }
}
