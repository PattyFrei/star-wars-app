import { Component, OnInit } from '@angular/core';

import { Character } from './../models/character';
import { SwapiService } from './../swapi.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
    people: any;

    constructor(private swapiService: SwapiService) {}

    ngOnInit(): void {
        this.getPeople();
    }

    getPeople(): void {
        this.swapiService
            .getPeople()
            .subscribe((people) => this.dataLoaded(people));
    }

    private dataLoaded(people: any): void {
        this.people = people;
        console.log(this.people);
    }
}
