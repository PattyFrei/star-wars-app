import { Component, OnInit } from '@angular/core';

import { Character } from './../models/character';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
    people: Character[];

    constructor() {}

    ngOnInit(): void {}
}
