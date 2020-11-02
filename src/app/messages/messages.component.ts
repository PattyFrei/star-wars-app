import { Component, OnInit } from '@angular/core';

import { MessageService } from './../services/message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.less'],
})
export class MessagesComponent implements OnInit {
    // angular only binds public component properties to the template
    constructor(public messageService: MessageService) {}

    ngOnInit(): void {}
}
