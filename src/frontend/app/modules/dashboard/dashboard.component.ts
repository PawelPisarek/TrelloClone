import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
@Component({
	selector: 'dashboard',
	templateUrl: 'app/modules/dashboard/dashboard.html',
	directives: [MATERIAL_DIRECTIVES]
})
export class Dashboard {
    constructor() {
      this.name = 'Max',
      this.token = '123456789'
    }
}
