import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// register service
import { HttpService } from './http.service';
// import httpclient
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthorComponent } from './author/author.component';
import { NewauthComponent } from './newauth/newauth.component';
import { EditauthComponent } from './editauth/editauth.component';
import { OneauthComponent } from './oneauth/oneauth.component';
import { QuoteformComponent } from './quoteform/quoteform.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    NewauthComponent,
    EditauthComponent,
    OneauthComponent,
    QuoteformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
