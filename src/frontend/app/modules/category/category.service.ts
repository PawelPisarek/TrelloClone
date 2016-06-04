import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from "angular2/http";
import {Category} from "./category.model";
@Injectable()
export class CategoryService {
    constructor(private http:Http) {
    }

    getCategories() {
        var header = new Headers();
        let token =  localStorage.getItem('token');
        let userId =  localStorage.getItem('userId');

        header.append('x-access-token', token);
        return this.http.get(`http://localhost:8081/api/kategorie`,{headers:header})
            .map(res => (<Response>res).json())
            .map((apiDashboard) => {
                    const results = [];
                    if (apiDashboard) {
                        apiDashboard.forEach((board:Category)=> {
                            results.push(new Category(board.id, board.name))
                        });
                    }
                    return results;
                }
            )
    }
}
