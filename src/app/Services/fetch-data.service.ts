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
    return this.http.get("https://my-json-server.typicode.com/samadhan111/EH-demo-project/contacts");
  }
  getContactDetailsById(id: number): Observable<any> {
    return this.http.get("https://my-json-server.typicode.com/samadhan111/EH-demo-project/contacts/" + id);
  }
  createContact(newUser): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = { headers: httpHeaders };
    return this.http.post("https://my-json-server.typicode.com/samadhan111/EH-demo-project/contacts", newUser, options);
  }
  updateContact(id: number, updatedUserDetails): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = { headers: httpHeaders };
    return this.http.put(
      "https://my-json-server.typicode.com/samadhan111/EH-demo-project/contacts/" + id,
      updatedUserDetails,
      options
    );
  }
  removeContact(id: number): Observable<any> {
    return this.http.delete("https://my-json-server.typicode.com/samadhan111/EH-demo-project/contacts/" + id);
  }
}
