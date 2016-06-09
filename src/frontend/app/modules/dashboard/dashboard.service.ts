import {Injectable} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DashboardService {
        constructor(public router: Router, public http: Http){
      }
}
