import {Component, Input} from "angular2/core";
import {Router} from "express-serve-static-core";
import {RouteParams} from "angular2/router";
import {TaskService} from "./task.service";
import {Task, OneTask} from "./task.model";
import {Board} from "../board/board.model";
import {Category} from "../category/category.model";
import {MATERIAL_PROVIDERS} from "ng2-material/all";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
@Component({
    selector: 'task-new',
    templateUrl: 'app/modules/task/task-new.html',
    directives: [MATERIAL_DIRECTIVES],
    providers: [TaskService, MATERIAL_PROVIDERS]
})
export class TaskNewComponent {

    @Input() board:Board;
    @Input() category:Category;
    private formModel:string;
    private submitted:boolean = false;

    constructor(private _taskService:TaskService) {
    }

    ngOnInit() {
        this.formModel = '';
    }

    edit() {
        this.submitted = true;
    }

    submit() {
        this._taskService.createTask(new Task(
            0,
            this.board,
            0,
            this.category,
            'name',
            this.formModel,
            'deadline był wczoraj')).subscribe(dane => {
        });
        this.submitted = false;
    }
}
