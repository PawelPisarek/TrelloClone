import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Login} from './modules/login/login.component';
@Component({
    selector: 'hello-app',
    template: `
    <login>LOAD LOGIN</login>
    `,
   directives: [Login],
})
export class HelloApp {
    name:string = 'World';
}

bootstrap(HelloApp);