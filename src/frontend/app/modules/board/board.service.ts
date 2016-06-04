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

    createBoard(board:Board) {
      
        var header = new Headers();
        let token =  localStorage.getItem('token');
        let userId =  localStorage.getItem('userId');
        header.append('x-access-token', token);
        var creds = `{
            "name": "${board.name}",
            "author": "${userId}"
        }`;

        header.append('Content-Type', 'application/json');
        return this.http.post(`http://localhost:8081/api/board/`,creds,{headers:header})
            .map(res => (<Response>res).json())
            .map(data=> {

                return data;
            })
    }

    getBoard(id:number) {

        var header = new Headers();
        let token =  localStorage.getItem('token');
		let userId =  localStorage.getItem('userId');
        header.append('x-access-token', token);
        return this.http.get(`http://localhost:8081/api/board/${id}/${userId}`,{headers:header})
            .map(res => (<Response>res).json())
            .map(jboard=> {

                return new Board(jboard.id, jboard.name, jboard.author);
            })
    }
}
