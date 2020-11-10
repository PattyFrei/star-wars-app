import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';

import { Character, Species, Planet, Movie } from '../models';
import { SwapiService } from './../services/swapi.service';

@Component({
    selector: 'app-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.less'],
})
export class CharacterDetailComponent implements OnInit, OnChanges {
    @Input() character: Character;
    areDetailsLoaded: boolean;
    films: Movie[];
    hasHomeworld: boolean;
    hasSpecies: boolean;
    homeworld: Planet;
    species: Species;

    constructor(private swapiService: SwapiService) {}

    ngOnInit(): void {}

    ngOnChanges() {
        this.areDetailsLoaded = false;
        if (this.character) {
            const loadAllDetails = [
                of(this.getSpecies()),
                of(this.getHomeworld()),
                of(this.getFilms()),
            ];
            forkJoin([loadAllDetails]).subscribe((_) => {
                this.areDetailsLoaded = true;
            });
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
            });
        } else {
            this.hasSpecies = false;
        }
    }

    getHomeworld(): void {
        const parsedId: number = parseInt(
            this.character.homeworld.slice(29, -1),
            10
        );
        if (parsedId) {
            this.swapiService.getPlanet(parsedId).subscribe((data) => {
                this.hasHomeworld = true;
                this.homeworld = data;
            });
        } else {
            this.hasHomeworld = false;
        }
    }

    getFilms(): void {
        this.films = [];
        this.character.films.forEach((filmUrl) => {
            const parsedId: number = parseInt(filmUrl.slice(27, -1), 10);
            this.swapiService.getFilms(parsedId).subscribe((data) => {
                this.films.push(data);
            });
        });
    }
}
