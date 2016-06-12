import {Component, Input} from "angular2/core";
import {Router} from "express-serve-static-core";
import {RouteParams} from "angular2/router";
import {TaskService} from "./task.service";
import {Task, OneTask, CheckList} from "./task.model";
import {FormBuilder, AbstractControl, ControlGroup, FORM_PROVIDERS} from "angular2/common";
@Component({
    selector: 'task-detail',
    templateUrl: 'app/modules/task/task-detail.html',
    providers: [TaskService, FORM_PROVIDERS, ControlGroup]
})
export class TaskDetailComponent {
    constructor(private _routeParams:RouteParams,
                private _taskService:TaskService,
                private fb:FormBuilder,
                private userForm:ControlGroup) {

        this.userForm = fb.group({
            'name': [''],
            'is_check': [''],
        });
        this.name = this.userForm.controls['name'];
        this.is_check = this.userForm.controls['is_check'];

    }


    @Input() task:Task;
    private name:AbstractControl;
    private is_check:AbstractControl;
    private checkList:CheckList[];
    private submitted:boolean = true;

    hideTask() {
        this.submitted = true;
    }

    getCheckList() {
        this._taskService.getCheckList(this.task)
            .subscribe(data => {
                this.checkList = data;
            })
    }

    showTask() {
        this.submitted = false;
        this.getCheckList();
    }

    onSubmit(data:CheckList) {
        data.is_check = 0;
        this._taskService.checklistTask(data, this.task)
            .subscribe(data => {

                this.getCheckList();
            });
    }

    clicked() {
        // console.log();
    }

}
