import {Injectable} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';

import {Http, Response, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

export class User {
    constructor(public password:string, public email:string) {
    }
}

@Injectable()
export class LoginService {
    constructor(public router: Router, public http: Http) {
    }

    auth(value:User) {
        var creds = `{
            "login": "${value.email}",
            "pass": "${value.password}"
        }`;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.post('/api/login', creds,
            {
                headers: header
            })
            .map(res=>(<Response>res).json())
            .subscribe(
                data => this.saveJwt(data),
                err=>this.logError(err)
            );
    }


    saveJwt(jwt) {
        if (jwt) {
            localStorage.setItem('token', jwt.token);
            localStorage.setItem('userId', jwt.userId);
        }
        if (jwt.failed){

        }else{
            this.router.navigateByUrl('/dashboard');
        }
    }

    private logError(err):any {
        console.log("PODALES ZLY LOGIN LUB HASLO!");
        console.log("wrong" + err);
    }
}
