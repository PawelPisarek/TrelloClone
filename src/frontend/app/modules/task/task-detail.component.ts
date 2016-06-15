import {Component, Input, EventEmitter, Output} from "angular2/core";
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


    }


    @Input() task:Task;
    @Output() shoTask:EventEmitter<Task>=new EventEmitter();

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
        this.shoTask.emit(this.task);
    }

    checklistUpdate(checkList:CheckList) {

        checkList.is_check = (checkList.is_check) ? 0 : 1;
        this._taskService.checklistUpdate(checkList)
            .subscribe(data=> {
                    this.getCheckList();
                },
                error=> {
                    console.log(error);
                })

    }
}
