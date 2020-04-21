import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { loginService } from "../Services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userName: string;
  passWord: string;
  constructor(private router: Router, private loginservice: loginService) {
    this.loginservice.userName.subscribe((item) => {
      this.userName = item;
    });
  }

  onLogIn(username, password) {
    this.userName = username.value;
    this.passWord = password.value;
    if (this.userName.toLowerCase() == "admin" || this.passWord == "admin") {
      this.loginservice.userName.next(this.userName);
      localStorage.setItem("admin", this.userName);
      this.router.navigate(["home"]);
    } else {
      alert("Please fill correct details");
    }
  }
  ngOnInit() {}
}
