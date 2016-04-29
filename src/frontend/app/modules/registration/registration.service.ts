import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";

export class UserForm {
    constructor(public email:string, public password:string) {
    }
}

@Injectable()
export class UsersService {

    constructor(private http:Http) {
    }
    
    register(value:UserForm) {
        const body = `{"email":"${value.email}","password":"${value.password}"}`; // można użyć JSON.stringify(value) tez dziala
        const header = new Headers();
        header.append("Content-Type", "application/json");

        return this.http.post('http://localhost:8081/register', body, {headers: header})
            .map(res => (<Response>res).statusText);

    }
}
