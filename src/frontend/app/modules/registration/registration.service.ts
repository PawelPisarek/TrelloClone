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
            "email": "${value.email}",
            "password": "${value.password}"
        }`;
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        
     return  this.http.post('http://localhost:8081/api/register', creds,
            {
                headers: header
            })
            .map(res => (<Response>res).json())
            .subscribe(
                data => this.saveJwt(data),
                err => this.logError(err)
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

    private logError(err): any {
        console.log("wrong" + err);
    }
}