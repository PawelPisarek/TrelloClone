import {Component} from "angular2/core";
import {RouterLink} from 'angular2/router';
import {
	MdPatternValidator,
	MdMinValueValidator,
	MdNumberRequiredValidator,
	MdMaxValueValidator,
	MATERIAL_DIRECTIVES
} from "ng2-material/all";
import {FORM_DIRECTIVES, Validators, FormBuilder, ControlGroup} from "angular2/common";
import {LoginService} from "./login.service";
import {HTTP_PROVIDERS} from "angular2/http";
@Component({
	selector: 'login',
	templateUrl: 'app/modules/login/login.html',
	directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES,RouterLink],
    providers: [LoginService, HTTP_PROVIDERS]
})
export class Login {
	projectForm: ControlGroup;
	model = {
		email: '',
		password: ''
	};
	constructor(fb: FormBuilder, private _loginService:LoginService) {
		this.projectForm = fb.group({
			'password': ['', Validators.required],
			'email': ['', Validators.compose([
				// MdPatternValidator.inline('^.+@.+\..+$'),
				// Validators.required,
				// Validators.minLength(10),
				// Validators.maxLength(100)
			])]
		});
	}
    onSubmit(){
		this._loginService.auth(this.projectForm.value);
        // console.log(this.projectForm.value);
        
    }

    get value(): string {
        return JSON.stringify(this.loginForm.value, null, 2);
    }
}
