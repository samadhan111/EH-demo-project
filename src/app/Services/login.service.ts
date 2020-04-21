import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class loginService {
  userName = new BehaviorSubject("");
  constructor() {}
}
