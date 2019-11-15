import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getQuotes() {
    return this._http.get("/quotes");
  }

  addAuth(newAuth) {
    return this._http.post("/quotes", newAuth);
  }

  getOne(id) {
    return this._http.get(`/quotes/${id}`);
  }

  editAuthor(editAuth) {
    return this._http.put(`/quotes/${editAuth._id}`, editAuth);
  }

  delelteOneQuote(Aid, Qid) {
    return this._http.delete(`/quotes/${Aid}/${Qid}`);
  }

  addQuote(editAuth) {
    return this._http.put(`/quotes/${editAuth.id}/new`, editAuth);
  }

  editAuthoraddquote(editAuth) {
    return this._http.put(`/quotes/${editAuth._id}/new`, editAuth);
  }

  voteOneQuote(Aid, Qid) {
    return this._http.put(`/quotes/upvote/${Aid}/${Qid}`, Aid);
  }
  dvoteOneQuote(Aid, Qid) {
    return this._http.put(`/quotes/downvote/${Aid}/${Qid}`, Aid);
  }
}
