import {
    Component,
    ChangeDetectionStrategy
} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Observable} from 'rxjs';
import {Message} from '../models';


@Component({
    selector: 'chat-window',
    directives: [
        FORM_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="chat-window-container">
      <div class="chat-window">
        <div class="panel-container">
          <div class="panel panel-default">

            <div class="panel-heading top-bar">
              <div class="panel-title-container">
                <h3 class="panel-title">
                  <span class="glyphicon glyphicon-comment"></span>
                  Chat - 
                </h3>
              </div>
              <div class="panel-buttons-container">
                <!-- you could put minimize or close buttons here -->
              </div>
            </div>

            <div class="panel-body msg-container-base">
              <!--<chat-message-->
                   <!--*ngFor="#message of messages | async"-->
                   <!--[message]="message">-->
              <!--</chat-message>-->
            </div>

            <div class="panel-footer">
              <div class="input-group">
                <input type="text" 
                       class="chat-input"
                       placeholder="Write your message here..."
                       (keydown.enter)="onEnter($event)"
                       [(ngModel)]="draftMessage.text" />
                <span class="input-group-btn">
                  <button class="btn-chat"
                     (click)="onEnter($event)"
                     >Send</button>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatWindow {
    messages:Observable<any>;
    draftMessage:Message = new Message({text: ''});

    onEnter(event:any):void {
        console.log(event);
        event.preventDefault();
    }
}
