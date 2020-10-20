import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Character, People } from './models/character';

@Injectable({
    providedIn: 'root',
})
export class SwapiService {
    swapiUrl = 'https://swapi.dev/api';
    constructor(private http: HttpClient) {}

    getPeople(): Observable<People> {
        return this.http.get<People>(`${this.swapiUrl}/people`);
    }

    getCharacter(id: number): Observable<Character> {
        return this.http.get<Character>(`${this.swapiUrl}/people/${id}/`);
    }
}
