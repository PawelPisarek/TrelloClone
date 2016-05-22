import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";
import { Router, RouterLink } from 'angular2/router';

export class UserForm {
    constructor(public email:string, public password:string) {
    }
}

@Injectable()
export class UsersService {

    constructor(public router: Router, public http: Http) {
    }

    register(value: UserForm) {
        var creds = `{
            "login": "${value.email}",
            "pass": "${value.password}"
        }`;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        
        this.http.post('http://localhost:8081/register', creds,
            {
                headers: header
            })
            .map(res => (<Response>res).json())
            .subscribe(
            err => this.logError(err)
            );
    }

    private logError(err): any {
        console.log("wrong" + err);
    }
}
