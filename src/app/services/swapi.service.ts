import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Character, People, Planet, Movie, Species } from './../models';
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

    getFilms(id: number): Observable<Movie> {
        return this.http.get<Movie>(`api/films/${id}/`).pipe(
            tap((_) => this.log(`film ${id} fetched`)),
            catchError(this.handleError<Movie>(`fetching film ${id}`))
        );
    }

    getPlanet(id: number): Observable<Planet> {
        return this.http.get<Planet>(`api/planets/${id}/`).pipe(
            tap((_) => this.log(`planet ${id} fetched`)),
            catchError(this.handleError<Planet>(`fetching planet ${id}`))
        );
    }

    getSpecies(id: number): Observable<Species> {
        return this.http.get<Species>(`api/species/${id}/`).pipe(
            tap((_) => this.log(`species ${id} fetched`)),
            catchError(this.handleError<Species>(`fetching species ${id}`))
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
