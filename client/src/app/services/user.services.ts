import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environments.prod";
import { Observable } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root',
})

export class UserService {

    constructor(private http: HttpClient) {


    }
    //get all users
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.endpoint + "api/users")
    }
    //del suer
    delUser(id: number) {
        console.log("delUser");
        fetch(environment.endpoint + "api/user/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return this.getUsers()
    }
    //edit user
    editUser(id: number, opt: object) {
        fetch(environment.endpoint + "api/user/" + id, opt)
            .then(resp => resp.json())
            .then(data => data)
    }
}