import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { FetchDataService } from "../Services/fetch-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _fetchData: FetchDataService,
    private router: Router
  ) {}
  user: any = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    addressDetails: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  };
  employeeDetails = [];
  isLoading: boolean = true;
  ngOnInit() {
    this._fetchData.contactDetails.subscribe((contacts) => {
      this.employeeDetails = contacts;
      this.isLoading = !!!this.employeeDetails.length;
    });
  }

  updateEmployee(id) {
    this._fetchData.updateID.next(id);
    this.router.navigate(["dashboard/contactForm"]);
  }
  removeEmployee(id: number) {
    this._fetchData.removeContact(id).subscribe(() => {
      this._fetchData.getDetails();
    });
  }
}
