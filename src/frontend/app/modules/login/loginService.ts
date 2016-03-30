import {Injectable} from 'angular2/core';

import {Http, Response, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';


@Injectable()
export class loginService {
    public quoteOfTheDay:string = 'World';

    auth(value:string) {
        var creds = "username=" + value + "&password=" + value;
        var header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost:3001/sessions/create', creds,
            {
                headers: header
            })
            .map(res=>(<Response>res).json())
            .subscribe(
                data => this.saveJwt(data.id_token),
                err=>this.logError(err)
            )
    }

    saveJwt(jwt) {
        if (jwt) {
            localStorage.setItem('id_token', jwt);
        }
    }

    getQuote() {
        var jwt = localStorage.getItem('id_token');
        var authHeader = new Headers();
        if (jwt) {
            authHeader.append('Authorization', 'Bearer ' + jwt);
        }
        this.http.get('http://localhost:3001/api/protected/random-quote', {
                headers: authHeader

            })
            .map(res=>(<Response>res).text())
            .subscribe(
                data=>this.quoteOfTheDay = data,
                err=>this.logError(err)
            );

    }

    constructor(public http:Http) {

    }

    private logError(err):any {
        console.log("wrong" + err);
    }
}
