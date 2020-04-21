import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, PageNotFoundComponent, DashboardComponent, ContactFormComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
