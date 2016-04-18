import {Component} from "angular2/core";
import {
	MdPatternValidator,
	MdMinValueValidator,
	MdNumberRequiredValidator,
	MdMaxValueValidator,
	MATERIAL_DIRECTIVES
} from "ng2-material/all";
import {FORM_DIRECTIVES, Validators, FormBuilder, ControlGroup} from "angular2/common";
@Component({
	selector: 'login',
	templateUrl: 'app/modules/login/login.html',
	directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})
export class Login {
	projectForm: ControlGroup;
	model = {
		email: '',
		password: ''
	};
	constructor(fb: FormBuilder) {
		this.projectForm = fb.group({
			'password': ['', Validators.required],
			'email': ['', Validators.compose([
				MdPatternValidator.inline('^.+@.+\..+$'),
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(100)
			])]
		});
	}
}
