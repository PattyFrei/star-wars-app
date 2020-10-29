import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Character, People } from './../models/character';

@Injectable({
    providedIn: 'root',
})
export class SwapiService {
    constructor(private http: HttpClient) {}

    getPeople(): Observable<People> {
        return this.http.get<People>(`api/people/`);
    }

    getCharacter(id: number): Observable<Character> {
        return this.http.get<Character>(`api/people/${id}/`);
    }

    getDetail(urlInstance: string): Observable<any> {
        const urlPath: string = urlInstance.slice(21);
        return this.http.get<any>(`api/${urlPath}`);
    }
}
