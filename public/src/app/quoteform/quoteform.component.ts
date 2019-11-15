import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-quoteform',
  templateUrl: './quoteform.component.html',
  styleUrls: ['./quoteform.component.css']
})
export class QuoteformComponent implements OnInit {

  editAuth: any;
  id: any; errors: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.id = params['id'];
    });
    this.showEditForm(this.id);
    this.editAuth = { name: "" };
    this.errors = { content: "" };
  }
  showEditForm(id) {

    // this.showdetail = !this.showdetail;
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      console.log("One Task!!", data);
      this.editAuth = data['result'];
      console.log("One Auth to edit ", this.editAuth);
    });
  }


  onEditaddQuote() {
    // edit_task.showEditForm = false;
    let observable = this._httpService.editAuthoraddquote(this.editAuth);
    observable.subscribe(data => {
      console.log('Edit ', data);
      // this.edit_task = data;
      // this.editAuth = { name: "" };
      // this._router.navigate(['/']);

      if (data['msg'] != "Error") {
        this.id = this.editAuth._id;
        console.log(this.id)
        this.editAuth = { content: "" };
        this.errors = { content: "" };
        this._router.navigate([`/quote/${this.id}`]);
      }
      else {
        console.log("Error", data['msg'])
        this.errors.content = data['msg'] + " Quote is Require";
        console.log(this.errors.content);
      }

    });
  }

}
