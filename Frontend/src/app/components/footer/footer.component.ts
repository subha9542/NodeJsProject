import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  form = new Form("");

  ngOnInit(): void {
  }

  subscription = false;

  subscribeAlert() {
    //alert("You have successfully subscribed!");
    this.subscription = true;
  }

}

class Form {
  email : string;

  constructor(email) {
    this.email = email;
  }
}