import {Component, OnInit} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {BoardService} from "./board.service";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Board} from "./board.model";
import {Router} from "angular2/router";
@Component({
    selector: 'board-list',
    templateUrl: 'app/modules/board/board-list.html',
    providers: [BoardService, HTTP_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES]
})
export class BoardListComponent implements OnInit {
    constructor(private _service:BoardService, private  _router:Router) {
    }

    private _boards:Array<Board>;

    ngOnInit() {
        this._service.getBoards().subscribe(data=> {
            this._boards = data;
        });
    }

    onSelect(board:Board) {
        this._router.navigate(['BoardDetail', {id: board.id}]);
    }
}
