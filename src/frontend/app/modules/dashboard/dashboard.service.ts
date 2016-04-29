import {Injectable} from 'angular2/core';
import {Http, Response} from "angular2/http";
import {Dashboard} from "./dashboard.model";
export class ApiDashboard {
    public boards:Array<Dashboard>;
}
@Injectable()
export class DashboardService {
    constructor(private http:Http) {
    }

    getDashboard() {
        return this.http.get("http://localhost:8081/dashboard")
            .map(res => (<Response>res).json())
            .map((apiDashboard:ApiDashboard) => {
                    const results = [];
                    if (apiDashboard) {
                        apiDashboard.boards.forEach((dashboard:Dashboard)=> {
                            results.push(new Dashboard(dashboard.id, dashboard.name, dashboard.author))
                        });
                    }
                    return results;
                }
            )
    }

}
