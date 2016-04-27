import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector : 'welcome-component',
    templateUrl : 'app/modules/welcome/welcome.html',
    directives : [RouterLink]
})
export class WelcomeComponent {

}
