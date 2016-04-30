import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, Router} from 'angular2/router';
import {Login} from './modules/login/login.component';
import {WelcomeComponent} from './modules/welcome/welcome.component';
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {Registration} from "./modules/registration/registration.component";

@Component({
    selector : "my-app",
    template: `
        <router-outlet></router-outlet>
    `,
    directives : [RouterOutlet, Login, WelcomeComponent, DashboardComponent, Registration],
    providers  : []
})
@RouteConfig([
    { path : '/', name : "WelcomeComponent", component : WelcomeComponent, useAsDefault:true },
    { path : '/login', name : "Login", component : Login },
    { path : '/dashboard/...', name : "Dashboard", component : DashboardComponent },
    { path : '/registration', name : "Registration", component : Registration}
])
export class App {
    constructor(public router: Router) {
    }
}
