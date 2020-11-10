import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    maxMessageLength = 15;
    messages: string[] = [];

    constructor() {}

    add(message: string): void {
        if (this.messages.length >= this.maxMessageLength) {
            this.messages = this.messages.slice(1, this.maxMessageLength);
        }
        this.messages.push(message);
    }

    clear(): void {
        this.messages = [];
    }
}
