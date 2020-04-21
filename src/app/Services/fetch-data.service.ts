import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FetchDataService {
  contactDetails = new BehaviorSubject([]);
  updateID = new BehaviorSubject(0);
  constructor(private http: HttpClient) {
    this.getDetails();
  }

  getDetails() {
    this.getAllContactDetails().subscribe((data) => {
      this.contactDetails.next(data);
    });
  }
  getAllContactDetails(): Observable<any> {
    return this.http.get("http://localhost:3000/contacts");
  }
  getContactDetailsById(id: number): Observable<any> {
    return this.http.get("http://localhost:3000/contacts/" + id);
  }
  createContact(newUser): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = { headers: httpHeaders };
    return this.http.post("http://localhost:3000/contacts", newUser, options);
  }
  updateContact(id: number, updatedUserDetails): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = { headers: httpHeaders };
    return this.http.put(
      "http://localhost:3000/contacts/" + id,
      updatedUserDetails,
      options
    );
  }
  removeContact(id: number): Observable<any> {
    return this.http.delete("http://localhost:3000/contacts/" + id);
  }
}
