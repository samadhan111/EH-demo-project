import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { AuthGuard } from "./Guards/auth.guard";
import { FormGuard } from "./Guards/form.guard";

const appRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home", canActivate: [AuthGuard], component: HomeComponent },
  {
    path: "dashboard",
    children: [
      { path: "", component: DashboardComponent },
      {
        path: "contactForm",
        canDeactivate: [FormGuard],
        component: ContactFormComponent,
      },
    ],
  },

  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
