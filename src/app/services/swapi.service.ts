import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Character, People } from './../models/character';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root',
})
export class SwapiService {
    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getPeople(): Observable<People> {
        this.log('available characters fetched');
        return this.http.get<People>(`api/people/`);
    }

    getCharacter(id: number): Observable<Character> {
        this.log('character profile fetched');
        return this.http.get<Character>(`api/people/${id}/`);
    }

    getDetail(urlInstance: string): Observable<any> {
        const urlPath: string = urlInstance.slice(21);
        this.log('character detail fetched');
        return this.http.get<any>(`api/${urlPath}`);
    }

    private log(message: string): void {
        this.messageService.add(`system: ${message}`);
    }
}
