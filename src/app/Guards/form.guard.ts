import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate,
} from "@angular/router";
import { Observable } from "rxjs";
import { ContactFormComponent } from "../contact-form/contact-form.component";

@Injectable({
  providedIn: "root",
})
export class FormGuard implements CanDeactivate<ContactFormComponent> {
  canDeactivate(
    test: ContactFormComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return confirm("Do you really want to navigate away?");
  }
}
