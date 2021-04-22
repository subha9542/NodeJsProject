import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  model: any = {};
  login_model: any = {};
  token;
  serviceErrors: any = {};
  messages: any;
  resettedFlag = false;
  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access-token');
    if (token != null) {
      console.log('Token there');
      this.router.navigate(['/add-news']);
    }
    this.messages = this.route.snapshot.paramMap.get('messages');
  }

  login() {
    this.resettedFlag = false;
    let data: any = this.login_model;
    console.log(data);
    this.http.post('http://localhost:3000/auth/login', data).subscribe(
      (response: any) => {
        console.log(response.message);
        this.token = response.token;
        console.log(this.token);
        window.localStorage.setItem('access-token', this.token);
        this.router.navigateByUrl('/add-news');
      },
      (error) => {
        this.serviceErrors = error.error.error;
        console.log(this.serviceErrors);
      }
    );
  }
  register(form: FormGroup) {
    this.resettedFlag = false;
    let data: any = this.model;
    console.log(data);
    this.http.post('http://localhost:3000/auth/register', data).subscribe(
      (response: any) => {
        console.log(response.message);
        this.reset(form)
        this.messages = response.message + '! Please Login!';
        this.router.navigateByUrl('/login-register');
      },
      (error) => {
        this.serviceErrors = error.error.error;
        this.messages = error.error.error;
        console.log(this.serviceErrors);
      }
    );
  }

  reset(form: FormGroup) {
    this.resettedFlag = true;
    form.reset(undefined);
    for(var name in form.controls) {
      form.controls[name].setValue("");
      form.controls[name].setErrors(null);
      form.controls[name].markAsUntouched();
    }
    this.resettedFlag = false;
  }
}
