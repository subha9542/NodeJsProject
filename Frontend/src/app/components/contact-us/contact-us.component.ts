import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  form = new Form("", "");
  

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    alert("E-mail: " + this.form.email + "\r\n" + "Query: " + this.form.query);
  }
}

class Form {
  email : string;
  query : string;

  constructor(email, query) {
    this.email = email;
    this.query = query;
  }
}