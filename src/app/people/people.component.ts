import { Component, OnInit } from '@angular/core';

import { Character, People } from './../models/character';
import { SwapiService } from './../services/swapi.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.less'],
})
export class PeopleComponent implements OnInit {
    fetchedFilms: string[] = [];
    fetchedHomeworld: string;
    fetchedPeople: Character[] = [];
    fetchedSpecies: string;
    numberOfPeople = 3;
    people: People;
    selectedCharacter: Character;
    selectedIds: number[];

    get arePeopleLoaded(): boolean {
        return this.fetchedPeople.length >= 1;
    }

    constructor(private swapiService: SwapiService) {}

    ngOnInit(): void {
        this.getPeople();
    }

    getHomeWorld(): void {
        const parsedUrl: string = this.selectedCharacter.homeworld.toString();
        parsedUrl
            ? this.swapiService
                  .getDetail(parsedUrl)
                  .subscribe((data) => (this.fetchedHomeworld = data.name))
            : (this.fetchedHomeworld = 'unknown');
    }

    getFilms(): void {
        this.fetchedFilms = [];
        this.selectedCharacter.films.forEach((filmUrl) =>
            this.swapiService
                .getDetail(filmUrl)
                .subscribe((data) => this.fetchedFilms.push(data.title))
        );
    }

    getPeople(): void {
        this.swapiService
            .getPeople()
            .subscribe((data) => this.peopleLoaded(data));
    }

    getSelectedPeople(): void {
        this.selectedIds.forEach((id) =>
            this.swapiService
                .getCharacter(id)
                .subscribe((character) => this.fetchedPeople.push(character))
        );
    }

    getSpecies(): void {
        const parsedUrl: string = this.selectedCharacter.species.toString();
        parsedUrl
            ? this.swapiService
                  .getDetail(parsedUrl)
                  .subscribe((data) => (this.fetchedSpecies = data.name))
            : (this.fetchedSpecies = 'unknown');
    }

    onSelect(character: Character): void {
        this.selectedCharacter = character;
        this.getSpecies();
        this.getHomeWorld();
        this.getFilms();
    }

    selectRandomIds(): void {
        this.selectedIds = [
            ...Array(this.numberOfPeople).keys(),
        ].map((element) => Math.floor(Math.random() * this.people.count + 1));
        this.getSelectedPeople();
    }

    private peopleLoaded(data: People): void {
        this.people = data;
        this.selectRandomIds();
    }
}
