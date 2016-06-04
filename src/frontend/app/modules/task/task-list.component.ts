import {Component, Injector, Input, ElementRef} from 'angular2/core';

import {RouteParams, ROUTER_DIRECTIVES, RouteData, Router} from "angular2/router";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TaskService} from "./task.service";
import {Task} from "./task.model";
import {BoardService} from "../board/board.service";
import {Board} from "../board/board.model";
import {error} from "util";
import {Category} from "../category/category.model";
declare var jQuery:any;
@Component({
    selector: 'task-list',
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
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
    private tasks:Task[]=[
        {
            'name':"TASKNAME0",
            'board': 0
        },
        {
            'name':"TASKNAME1",
            'board': 0
        },
        {
            'name':"TASKNAME2",
            'board': 0
        },
        {
            'name':"TASKNAME3",
            'board': 0
        },
        {
            'name':"TASKNAME4",
            'board': 1
        },
        {
            'name':"TASKNAME5",
            'board': 1
        },
        {
            'name':"TASKNAME6",
            'board': 2
        }
    ];
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
}