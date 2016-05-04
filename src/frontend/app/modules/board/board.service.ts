import {Injectable} from 'angular2/core';
import {Http, Response} from "angular2/http";
import {Board} from "./board.model";
export class ApiBoard {
    public boards:Array<Board>;
}
@Injectable()
export class BoardService {
    constructor(private http:Http) {
    }

    getBoards() {
        return this.http.get("http://localhost:8081/dashboard")
            .map(res => (<Response>res).json())
            .map((apiDashboard:ApiBoard) => {
                    const results = [];
                    if (apiDashboard) {
                        apiDashboard.boards.forEach((board:Board)=> {
                            results.push(new Board(board.id, board.name, board.author))
                        });
                    }
                    return results;
                }
            )
    }

    getBoard(board:string) {
        return this.http.get(`http://localhost:8081/board/${board}`)
            .map(res => (<Response>res).json())
            .map(jboard=> {
                return jboard.id
            })
    }


}
