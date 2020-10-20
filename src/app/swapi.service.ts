import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Character } from './models/character';

@Injectable({
    providedIn: 'root',
})
export class SwapiService {
    swapiUrl = 'https://swapi.dev/api';
    constructor(private http: HttpClient) {}

    getPeople() {
        return this.http.get<any>(`${this.swapiUrl}/people`);
    }

    getCharacter(id: string): Observable<Character> {
        return this.http.get<Character>(`${this.swapiUrl}/people/${id}`);
    }
}
