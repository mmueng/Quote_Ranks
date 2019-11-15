import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-editauth',
  templateUrl: './editauth.component.html',
  styleUrls: ['./editauth.component.css']
})
export class EditauthComponent implements OnInit {
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
    this.errors = { name: "" };
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


  onEdit() {
    // edit_task.showEditForm = false;
    let observable = this._httpService.editAuthor(this.editAuth);
    observable.subscribe(data => {
      console.log('Edit ', data);
      // this.edit_task = data;
      // this.editAuth = { name: "" };
      // this._router.navigate(['/']);

      if (data['msg'] != "Error") {
        this.editAuth = { name: "" };
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
