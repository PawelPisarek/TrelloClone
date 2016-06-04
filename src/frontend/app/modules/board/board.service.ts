import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from "angular2/http";
import {Board} from "./board.model";
@Injectable()
export class BoardService {
    constructor(private http:Http) {
    }

    getBoards() {
        var header = new Headers();
        let token =  localStorage.getItem('token');
        let userId =  localStorage.getItem('userId');

        header.append('x-access-token', token);
        return this.http.get(`http://localhost:8081/api/boards/${userId}`,{headers:header})
            .map(res => (<Response>res).json())
            .map((apiDashboard) => {
                    const results = [];
                    if (apiDashboard) {
                        apiDashboard.forEach((board:Board)=> {
                            results.push(new Board(board.id, board.name, board.author))
                        });
                    }
                    return results;
                }
            )
    }

    getBoard(id:number) {
        return this.http.get(`http://localhost:8081/board/${id}`)
            .map(res => (<Response>res).json())
            .map(jboard=> {
                return new Board(jboard.board.id, jboard.board.name, jboard.board.author);
            })
    }


}
