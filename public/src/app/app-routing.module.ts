import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { NewauthComponent } from './newauth/newauth.component';
import { EditauthComponent } from './editauth/editauth.component';
import { OneauthComponent } from './oneauth/oneauth.component';
import { QuoteformComponent } from './quoteform/quoteform.component';
const routes: Routes = [
  { path: '', component: AuthorComponent },
  { path: 'new', component: NewauthComponent },
  { path: 'edit/:id', component: EditauthComponent },
  { path: 'quote/:id', component: OneauthComponent },
  { path: 'quote/new/:id', component: QuoteformComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '**', component: AuthorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
