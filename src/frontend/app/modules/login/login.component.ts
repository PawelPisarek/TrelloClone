import {Component, OnInit} from 'angular2/core';
import {
    Control, Validators, ControlGroup, AbstractControl, FormBuilder, FORM_DIRECTIVES,
    CORE_DIRECTIVES
} from "angular2/common";
import {loginService} from "./loginService";
import {Http, HTTP_PROVIDERS} from "angular2/http";
function skuValidator(control: Control): { [s: string]: boolean } {
    if (!control.value.match(/^gonto/)) {
        return {clientName: true};
    }
}
@Component({
    selector: 'login',
    templateUrl:'app/modules/login/login.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [loginService, HTTP_PROVIDERS]
    // styleUrls:['app/styles/build/styles.css']
})
export class Login{
    myForm: ControlGroup;
    clientName: AbstractControl;
    _service:loginService;


    constructor(fb:FormBuilder, private _service:loginService) {
        this.myForm = fb.group({
            'clientName': ['', Validators.compose([
                Validators.required, skuValidator])]
        });

        this.clientName = this.myForm.controls['clientName'];

    }

    onSubmit(value:string):void {
        this._service.auth(value.clientName);
        this._service.getQuote();

        console.log('you submitted value: ', value, 'Quote ', this._service.quoteOfTheDay);
    }

}