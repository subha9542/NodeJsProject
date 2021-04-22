import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsService } from '../../services/sports.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss'],
})
export class EditNewsComponent implements OnInit {
  newsId: String = '607de8e3cd3a1732c461ee5d';
  model:any = {}
  constructor(
    private route: ActivatedRoute,
    private sportsService: SportsService,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.newsId = params.id;
    });
  }

  ngOnInit(): void {
    this.sportsService.getNewsById(this.newsId).subscribe((res) => {
      console.log(res);
      this.model.title = res['title']
      this.model.description = res['description']
      this.model.newsUrl = res['newsUrl']
      this.model.imageUrl = res['imageUrl']
      return res;
    });
  }

  editNews() {
    let data: any = this.model;
    this.http.patch('http://localhost:3000/news/' + this.newsId, data).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/news-list',{messages : response.message}]);
      },
      (error) => {
        console.log(error.error.error);
      }
        );
      }
  }
