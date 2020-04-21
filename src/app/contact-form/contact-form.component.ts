import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { FetchDataService } from "../Services/fetch-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.css"],
})
export class ContactFormComponent implements OnInit {
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
    address: "",
    status: "",
    phone: "",
    addressDetails: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  };
  reactiveForm: FormGroup;
  employeeDetails = [];
  updateID = 0;
  ngOnInit() {
    this.reactiveForm = this._fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern("^[0-9]{10}")]],
      status: [null, Validators.required],
      addressDetails: this._fb.group({
        address: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, [Validators.required, Validators.pattern("^[0-9]{6}")]],
      }),
    });
    this._fetchData.updateID.subscribe((value) => {
      this.updateID = value;
    });
    if (this.updateID) {
      this.updateEmployee(this.updateID);
    }
  }

  get firstName() {
    return <FormControl>this.reactiveForm.controls.firstName;
  }
  get lastName() {
    return <FormControl>this.reactiveForm.controls.lastName;
  }
  get email() {
    return <FormControl>this.reactiveForm.controls.email;
  }
  get phone() {
    return <FormControl>this.reactiveForm.controls.phone;
  }
  get status() {
    return <FormControl>this.reactiveForm.controls.status;
  }
  get address() {
    const temp = <FormGroup>this.reactiveForm.controls.addressDetails;
    return temp.controls.address;
  }
  get city() {
    const temp = <FormGroup>this.reactiveForm.controls.addressDetails;
    return temp.controls.city;
  }
  get state() {
    const temp = <FormGroup>this.reactiveForm.controls.addressDetails;
    return temp.controls.state;
  }
  get zipCode() {
    const temp = <FormGroup>this.reactiveForm.controls.addressDetails;
    return temp.controls.zipCode;
  }
  submitHanddeler() {
    const newUser = this.reactiveForm.value;
    this._fetchData.updateID.subscribe((value) => {
      this.updateID = value;
    });
    if (this.updateID) {
      this._fetchData
        .updateContact(this.updateID, newUser)
        .subscribe((data) => {
          this._fetchData.updateID.next(0);
          this._fetchData.getDetails();
          this.reactiveForm.reset();
        });
    } else {
      this._fetchData.createContact(newUser).subscribe((data) => {
        this._fetchData.updateID.next(0);
        this._fetchData.getDetails();
        this.reactiveForm.reset();
      });
    }
  }
  updateEmployee(id) {
    this._fetchData.getContactDetailsById(id).subscribe((data) => {
      this.reactiveForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        status: data.status,
        addressDetails: {
          address: data.addressDetails.address,
          city: data.addressDetails.city,
          state: data.addressDetails.state,
          zipCode: data.addressDetails.zipCode,
        },
      });
    });
  }
}
