import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  allAuths: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getQuotesFromService();
  }
  getQuotesFromService() {
    let observable = this._httpService.getQuotes();
    observable.subscribe(data => {
      console.log(data);
      this.allAuths = data['result'];
      console.log(this.allAuths);
      this._router.navigate(['/auths']);
    })
  }
}
