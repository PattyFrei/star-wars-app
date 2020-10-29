import { Component, OnInit, Input } from '@angular/core';

import { Character } from './../models/character';

@Component({
    selector: 'app-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.less'],
})
export class CharacterDetailComponent implements OnInit {
    @Input() character: Character;
    @Input() species: string;
    @Input() homeworld: string;
    @Input() films: string[];

    constructor() {}

    ngOnInit(): void {}
}
