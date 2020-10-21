import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Character, People } from './models/character';

@Injectable({
    providedIn: 'root',
})
export class SwapiService {
    swapiUrl = 'https://swapi.dev/api';
    constructor(private http: HttpClient) {}

    getPeople(): Observable<People> {
        return this.http
            .get<People>(`${this.swapiUrl}/people/`)
            .pipe(catchError(this.handleError));
    }

    getCharacter(id: number): Observable<Character> {
        return this.http
            .get<Character>(`${this.swapiUrl}/people/${id}/`)
            .pipe(catchError(this.handleError));
    }

    getDetail(urlInstance: string): Observable<any> {
        const detailUrl = urlInstance.slice(21);
        return this.http
            .get<any>(`${this.swapiUrl}/${detailUrl}`)
            .pipe(catchError(this.handleError));
    }

    // source: https://angular.io/guide/http#getting-error-details
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            console.error(
                `Backend returned code ${error.status}, ` +
                    `body was: ${error.message}`
            );
        }
        // return an observable with a user-facing error message
        return throwError('An error occurred, please try again later.');
    }
}
