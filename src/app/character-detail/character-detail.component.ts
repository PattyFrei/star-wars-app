import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Character, Species, Planet } from '../models';
import { SwapiService } from './../services/swapi.service';

@Component({
    selector: 'app-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.less'],
})
export class CharacterDetailComponent implements OnInit, OnChanges {
    @Input() character: Character;
    fetchedDetails: number;
    films: string[];
    hasHomeworld: boolean;
    hasSpecies: boolean;
    homeworld: Planet;
    species: Species;

    get areDetailsLoaded(): boolean {
        return this.fetchedDetails >= 3;
    }

    constructor(private swapiService: SwapiService) {}

    ngOnInit(): void {}

    ngOnChanges() {
        if (this.character) {
            this.fetchedDetails = 0;
            this.getSpecies();
            this.getHomeworld();
            this.getFilms();
        }
    }

    getSpecies(): void {
        const parsedId: number = parseInt(
            this.character.species.toString().slice(29, -1),
            10
        );
        if (parsedId) {
            this.swapiService.getSpecies(parsedId).subscribe((data) => {
                this.hasSpecies = true;
                this.species = data;
                this.fetchedDetails++;
            });
        } else {
            this.hasSpecies = false;
            this.fetchedDetails++;
        }
    }

    getHomeworld(): void {
        const parsedId: number = parseInt(
            this.character.homeworld.toString().slice(27, -1),
            10
        );
        if (parsedId) {
            this.swapiService.getPlanet(parsedId).subscribe((data) => {
                this.hasHomeworld = true;
                this.homeworld = data;
                this.fetchedDetails++;
            });
        } else {
            this.hasHomeworld = false;
            this.fetchedDetails++;
        }
    }

    getFilms(): void {
        this.films = [];
        this.character.films.forEach((filmUrl) =>
            this.swapiService.getDetail(filmUrl).subscribe((data) => {
                this.films.push(data.title);
                this.fetchedDetails++;
            })
        );
    }
}
