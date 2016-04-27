import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, Router} from 'angular2/router';
import {Login} from './modules/login/login.component';
import {WelcomeComponent} from './modules/welcome/welcomeComponent';
import {Dashboard} from "./modules/dashboard/dashboard.component";


@Component({
    selector : "my-app",
    template: `
        <router-outlet></router-outlet>
    `,
    directives : [RouterOutlet, Login, WelcomeComponent, Dashboard],
    providers  : []
})
@RouteConfig([
    { path : '/', name : "WelcomeComponent", component : WelcomeComponent, useAsDefault:true },
    { path : '/login', name : "Login", component : Login },
    { path : '/dashboard', name : "Dashboard", component : Dashboard }
])
export class App {
    constructor(public router: Router) {
    }
}
