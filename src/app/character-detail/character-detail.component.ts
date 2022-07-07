import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { forkJoin, of } from 'rxjs';

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
    if (this.character.species.length) {
      const parsedId = this.getId(this.character.species[0]);
      this.swapiService.getSpecies(parsedId).subscribe((data) => {
        this.hasSpecies = true;
        this.species = data;
      });
    } else {
      this.hasSpecies = false;
    }
  }

  getHomeworld(): void {
    if (this.character.homeworld) {
      const parsedId = this.getId(this.character.homeworld);
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
      const parsedId = this.getId(filmUrl);
      this.swapiService.getFilms(parsedId).subscribe((data) => {
        this.films.push(data);
      });
    });
  }

  getId(url: string): number {
    const splitUrl = url.split('/').reverse();
    for (let index = 0; index < splitUrl.length; index++) {
      const id = splitUrl[index];
      const digitRegex = /^\d+$/;
      if (id && digitRegex.test(id)) {
        return Number.parseInt(id);
      }
    }
  }
}
