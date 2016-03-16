import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
    selector: 'hello-app',
    template: `
        <h1>Hello, {{name}}!</h1>
        Say hello to: <input [value]="name" (input)="name = $event.target.value">
        <md-card>Dowód na Material Design</md-card>
    `
})
export class HelloApp {
    name:string = 'World';
}

bootstrap(HelloApp);