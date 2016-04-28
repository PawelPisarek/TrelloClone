import {Component} from "angular2/core";
import {RouterLink} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES, Validators, FormBuilder, ControlGroup} from "angular2/common";
//import {RegistrationService} from "./registration.service";
import {HTTP_PROVIDERS} from "angular2/http";
@Component({
	selector: 'registration',
    templateUrl: 'app/modules/registration/registration.html',
	directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, RouterLink],
    providers: [ HTTP_PROVIDERS]
})
export class Registration {
	registrationForm: ControlGroup;
	model = {
		email: '',
		password: '',
		confirmPassword: ''
	};
	constructor(fb: FormBuilder) {
		this.registrationForm = fb.group({
			'password': ['', Validators.required],
			'confirmPassword': ['', Validators.required],
			'email': ['', Validators.compose([
				// MdPatternValidator.inline('^.+@.+\..+$'),
				// Validators.required,
				// Validators.minLength(10),
				// Validators.maxLength(100)
			])]
		});
	}

	/*constructor(fb: FormBuilder) {
		this.projectForm = fb.group({
			'password': ['', Validators.required],
			'confirmPassword': ['', Validators.required],
			'email': ['', Validators.compose([
				// MdPatternValidator.inline('^.+@.+\..+$'),
				// Validators.required,
				// Validators.minLength(10),
				// Validators.maxLength(100)
			])]
		});
	}*/
    /*onSubmit() {
		this._registrationService.auth(this.projectForm.value);
        // console.log(this.projectForm.value);

    }

    get value(): string {
        return JSON.stringify(this.registerForm.value, null, 2);
    }*/
}