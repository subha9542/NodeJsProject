import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../services/sports.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  newsList: any = [];
  messages:any;

  constructor(private sportsService: SportsService, private router: Router,
    private route: ActivatedRoute) {}
  ngOnInit() {
    this.messages = this.route.snapshot.paramMap.get('messages');
    this.sportsService.fetchData().subscribe((res: any) => {
      this.newsList = res;

      console.log(this.newsList);
    });
  }

  edit(index) {
    console.log(this.newsList[index]._id);
    let id = this.newsList[index]._id;
    // console.log(id);
    // console.log(`/edit-news/${id}`);
    this.router.navigateByUrl(`/edit-news/${id}`);
  }

  delete(index) {
    let id = this.newsList[index]._id;
    this.sportsService.deleteNews(id).subscribe((res) => {
      console.log(res);
      console.log('News Deleted');
      this.ngOnInit();
    });
  }
}
