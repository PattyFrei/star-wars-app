import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Character, People } from '../models';
import { SwapiService } from './../services/swapi.service';
import { MessageService } from './../services/message.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.less'],
})
export class PeopleComponent implements OnInit {
    fetchedPeople: Character[] = [];
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

    onSelect(character: Character): void {
        this.selectedCharacter = character;
        this.messageService.add(`user: selected ${character.name}`);
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
