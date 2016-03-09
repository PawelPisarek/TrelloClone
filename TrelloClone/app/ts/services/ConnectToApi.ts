import {Injectable} from 'angular2/core';
import {Http, Response} from "angular2/http";
import {Board} from "../models";
import {Observable} from "rxjs/Observable";
@Injectable()
export class ConnectToApi {
    constructor(public http:Http) {
    }

    getBoards():Observable<Board[]> {
        return this.http.get("https://api.trello.com/1/member/me/boards?key="+"tutaj-wstaw-klucz"+"&token="+"tutaj-wstaw-token")
            .map(res => (res as Response).json())
            .map((jboards:Array<any>) => {
                const result:Array<Board> = [];
                if (jboards) {
                    jboards.forEach(jboard => {
                        result.push(
                            new Board(
                                jboard.id,
                                jboard.name
                            ));
                    });
                }
                return result;
            });
    }
}
