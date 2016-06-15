import {Component, Injector, Input, ElementRef, EventEmitter, Output} from 'angular2/core';

import {RouteParams, ROUTER_DIRECTIVES, RouteData, Router} from "angular2/router";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TaskService} from "./task.service";
import {Task} from "./task.model";
import {BoardService} from "../board/board.service";
import {Board} from "../board/board.model";
import {error} from "util";
import {Category} from "../category/category.model";
import {TaskDetailComponent} from "./task-detail.component";
import {TaskAddChecklist} from "./task-add-checklist";
import {TaskNewComponent} from "./task-new.component";
declare var jQuery:any;
@Component({
    selector: 'task-list',
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES,TaskDetailComponent,TaskAddChecklist,TaskNewComponent],
    templateUrl: 'app/modules/task/task-list.html',
    providers: [TaskService]
})
export class TaskListComponent {
    constructor(private _elRef:ElementRef,
                private _taskService:TaskService,
                private _router:Router) {
    }

    @Input() board:Board;
    @Input() category:Category;
    @Output() refreshBoard:EventEmitter<any>=new EventEmitter();
    private tasks: Task[];
    private taskz:Task;
    hideInput:boolean = false;

    showInput() {
        this.hideInput = this.hideInput ? false : true;
    }

    clicked() {
        console.log('clicked');
    }

    ngOnInit() {
        jQuery(this._elRef.nativeElement).find("#sortable1, #sortable2").sortable({
            connectWith: ".connectedSortable"
        }).disableSelection();

        this._taskService.getTasks(this.board,this.category).subscribe(data=> {
            this.tasks = data; //zakomentuj tą linie jeżeli chcesz mieć dane z powyższej tablicy
        }, error=> {
            console.log(error);
        })
    }

    onSelect(task:Task) {
        this._router.navigate(['TaskDetail', {id: task.id}])
    }

    setTask(task:Task) {
        this.taskz = task;
    }
    getCategory(){
        this.refreshBoard.emit(null);
    }
}