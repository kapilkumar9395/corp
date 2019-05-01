import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{

    constructor(private http: Http){}

    registerUser(newUser: object){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        
        return this.http
        .post('http://localhost:3000/register', newUser, {headers: headers})
        .map(res => res.json());
    }
}