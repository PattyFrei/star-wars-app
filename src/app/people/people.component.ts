import { Component, OnInit } from '@angular/core';

import { Character, People, Planet, Species } from '../models';
import { SwapiService } from './../services/swapi.service';
import { MessageService } from './../services/message.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.less'],
})
export class PeopleComponent implements OnInit {
    hasHomeworld: boolean;
    hasSpecies: boolean;
    fetchedFilms: string[] = [];
    fetchedHomeworld: Planet;
    fetchedPeople: Character[] = [];
    fetchedSpecies: Species;
    numberOfPeople = 3;
    people: People;
    selectedCharacter: Character;
    selectedIds: number[];

    get arePeopleLoaded(): boolean {
        return this.fetchedPeople.length >= 1;
    }

    constructor(
        private swapiService: SwapiService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getPeople();
    }

    getHomeworld(): void {
        const parsedId: number = parseInt(
            this.selectedCharacter.homeworld.toString().slice(27, -1),
            10
        );
        console.log(parsedId);
        parsedId
            ? this.swapiService.getPlanet(parsedId).subscribe((data) => {
                  this.hasHomeworld = true;
                  this.fetchedHomeworld = data;
              })
            : (this.hasHomeworld = false);
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
        const parsedId: number = parseInt(
            this.selectedCharacter.species.toString().slice(29, -1),
            10
        );
        console.log(parsedId);
        parsedId
            ? this.swapiService.getSpecies(parsedId).subscribe((data) => {
                  this.hasSpecies = true;
                  this.fetchedSpecies = data;
              })
            : (this.hasSpecies = false);
    }

    onSelect(character: Character): void {
        this.selectedCharacter = character;
        this.messageService.add(`user: selected ${character.name}`);
        this.getSpecies();
        this.getHomeworld();
        this.getFilms();
    }

    selectRandomIds(): void {
        this.selectedIds = [...Array(this.numberOfPeople).keys()].map((_) =>
            Math.floor(Math.random() * this.people.count + 1)
        );
        this.getSelectedPeople();
    }

    private peopleLoaded(data: People): void {
        this.people = data;
        this.selectRandomIds();
    }
}
