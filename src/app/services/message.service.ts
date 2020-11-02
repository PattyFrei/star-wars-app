import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    messages: string[] = [];

    constructor() {}

    add(message: string): void {
        if (this.messages.length >= 11) {
            this.messages = this.messages.slice(1, 11);
        }
        this.messages.push(message);
    }

    clear(): void {
        this.messages = [];
    }
}
