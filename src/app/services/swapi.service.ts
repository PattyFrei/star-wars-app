import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
        return this.http.get<People>(`api/people/`).pipe(
            tap((people: People) =>
                this.log(`${people.count} characters fetched`)
            ),
            catchError(
                this.handleError<People>('fetching available characters')
            )
        );
    }

    getCharacter(id: number): Observable<Character> {
        return this.http.get<Character>(`api/people/${id}/`).pipe(
            tap((_) => this.log(`character profile ${id} fetched`)),
            catchError(this.handleError<Character>(`fetching character ${id}`))
        );
    }

    getDetail(urlInstance: string): Observable<any> {
        const urlPath: string = urlInstance.slice(21);
        return this.http.get<any>(`api/${urlPath}`).pipe(
            tap((_) => this.log('character detail fetched')),
            catchError(this.handleError<any>('fetching character detail'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.log(`error ${operation}: ${error.error.detail}`);
            return of(result as T);
        };
    }

    private log(message: string): void {
        this.messageService.add(`system: ${message}`);
    }
}
