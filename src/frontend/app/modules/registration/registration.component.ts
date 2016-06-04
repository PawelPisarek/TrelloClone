import {Component} from "angular2/core";
import {RouterLink} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES, Validators, FormBuilder, ControlGroup} from "angular2/common";
//import {RegistrationService} from "./registration.service";
import {HTTP_PROVIDERS} from "angular2/http";
import {UsersService, UserForm} from "./registration.service";
function matchingPasswords(passwordKey:string, confirmPasswordKey:string) {
	return (group:ControlGroup):{[key:string]:any} => {
		let password = group.controls[passwordKey];
		let confirmPassword = group.controls[confirmPasswordKey];

		if (password.value !== confirmPassword.value) {
			return {
				mismatchedPasswords: true
			};
		}
	};
}
@Component({
	selector: 'registration',
    templateUrl: 'app/modules/registration/registration.html',
	directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, RouterLink],
    providers: [ HTTP_PROVIDERS, UsersService]
})
export class Registration {
	registrationForm:ControlGroup;
	public apiResponse:string;

	constructor(builder:FormBuilder, private _service:UsersService) {
		this.registrationForm = builder.group({
			email: ["", Validators.required],
			passwordRetry: builder.group({
				password: ["", Validators.required],
				passwordConfirmation: ["", Validators.required]
			}, {validator: matchingPasswords('password', 'passwordConfirmation')})
		});
	}

	onSubmit(value:any):void {
		let user = new UserForm(value.email, value.passwordRetry.password);
		this._service.register(user).subscribe(
			data => {
				this.apiResponse = data;
			},
			err => {
				this.apiResponse = err._body;
			}
		);

	}}