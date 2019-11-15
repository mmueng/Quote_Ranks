import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-newauth',
  templateUrl: './newauth.component.html',
  styleUrls: ['./newauth.component.css']
})
export class NewauthComponent implements OnInit {

  errors: any;
  allAuths: any;
  newAuth: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    // this.addAuthsFromService();
    this.newAuth = { name: "" };
    this.errors = { name: "" };
  }

  addAuthsFromService() {
    let observable = this._httpService.addAuth(this.newAuth);
    observable.subscribe(data => {
      console.log(this.newAuth);
      console.log(data['msg']);
      if (data['msg'] != "Error") {
        this.newAuth = { name: "" };
        this.errors = { name: "" };
        this._router.navigate(['/']);
      }
      else {
        this.errors.name = data['msg'] + " Name is Require";
        console.log(this.errors.name);
      }
    });
  }

}
