import { Component, OnInit } from '@angular/core';

import { Character, People } from './../models/character';
import { SwapiService } from './../swapi.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
    fetchedPeople: Character[] = [];
    numberOfPeople = 3;
    people: People;
    selectedIds: number[];

    get arePeopleLoaded(): boolean {
        return this.fetchedPeople.length === this.numberOfPeople;
    }

    constructor(private swapiService: SwapiService) {}

    ngOnInit(): void {
        this.getPeople();
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
        console.log(this.fetchedPeople);
    }

    selectRandomId(): void {
        this.selectedIds = [
            ...Array(this.numberOfPeople).keys(),
        ].map((element) => Math.floor(Math.random() * this.people.count + 1));
        console.log(this.selectedIds);
        this.getSelectedPeople();
    }

    private peopleLoaded(data: People): void {
        this.people = data;
        console.log(this.people);
        this.selectRandomId();
    }
}
