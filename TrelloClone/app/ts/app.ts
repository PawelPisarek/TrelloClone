/**
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  Component
} from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

import {ChatWindow} from '../ts/components/ChatWindow';
import {BoardsList} from '../ts/components/BoardsList';
import {HTTP_PROVIDERS} from 'angular2/http';
/*
 * Webpack
 */
require('../css/styles.scss');

@Component({
  selector: 'chat-app',
    directives: [
        ChatWindow,
        BoardsList
    ],
  template: `
<boards-list></boards-list>
<div>
    <div class="container">
        <chat-window></chat-window>
    </div>
</div>
  `
})
class ChatApp {
}

bootstrap(ChatApp, [
    HTTP_PROVIDERS
]);


