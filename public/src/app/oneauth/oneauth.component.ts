import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-oneauth',
  templateUrl: './oneauth.component.html',
  styleUrls: ['./oneauth.component.css']
})
export class OneauthComponent implements OnInit {
  oneAuth: any;
  id: any;
  Qid: any;
  errors: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.id = params['id'];
    });
    this.showEditForm(this.id);
    this.oneAuth = { name: "", quotes: [{ votes: "" }, { content: "" }] };
    this.errors = { name: "" };
  }
  showEditForm(id) {

    // this.showdetail = !this.showdetail;
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      console.log("One Auth!!", data);
      this.oneAuth = data['result'];
      console.log("One Auth ", this.oneAuth);
    });
  }

  delelteOneQuotefromService(id, Qid) {
    console.log(id);
    console.log(Qid);
    let observable = this._httpService.delelteOneQuote(id, Qid);
    observable.subscribe(data => {
      console.log("Delete");
      this.oneAuth = data['result'];
      this._router.navigate(['/quote/:id']);
    })
  }
  voteOneQuotefromService(id, Qid) {
    console.log(id);
    console.log(Qid);
    let observable = this._httpService.voteOneQuote(id, Qid);
    observable.subscribe(data => {
      console.log(data);
      this.oneAuth = data['result'];
      console.log("Vote", this.oneAuth);
    })
    this.showEditForm(this.id);
    // this._router.navigate([`/quote/${id}`]);
  }

  dvoteOneQuotefromService(id, Qid) {
    console.log(id);
    console.log(Qid);
    let observable = this._httpService.dvoteOneQuote(id, Qid);
    observable.subscribe(data => {
      console.log(data);
      this.oneAuth = data['result'];
      console.log("Vote", this.oneAuth);
      this.showEditForm(this.id);
    })
    // this._router.navigate([`/quote/${id}`]);
  }
}