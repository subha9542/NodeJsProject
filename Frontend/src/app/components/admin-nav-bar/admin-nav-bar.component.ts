import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.scss']
})
export class AdminNavBarComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    //need to update this
    window.localStorage.clear();
    this.router.navigate(['/login-register',{messages:'Successfully LogedOut!'}])

  }
}