import { Component, OnInit, Input } from '@angular/core';

import { Character, Species, Planet } from '../models';

@Component({
    selector: 'app-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.less'],
})
export class CharacterDetailComponent implements OnInit {
    @Input() character: Character;
    @Input() hasHomeworld: boolean;
    @Input() hasSpecies: boolean;
    @Input() species: Species;
    @Input() homeworld: Planet;
    @Input() films: string[];

    constructor() {}

    ngOnInit(): void {}
}
