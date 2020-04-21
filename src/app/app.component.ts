import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { loginService } from "./Services/login.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  cartitems: number;
  userName: string = "";
  constructor(private router: Router, private loginservice: loginService) {
    this.loginservice.userName.subscribe((items) => {
      this.userName = items;
    });
  }
  ngOnInit() {}
  signIn() {
    this.router.navigate(["login"]);
  }
  logOut() {
    this.loginservice.userName.next("");
  }
  ngDestroy() {
    localStorage.removeItem("admin");
  }
}
