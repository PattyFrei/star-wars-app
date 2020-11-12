# StarWarsApp

## Documentation

**star-wars-app/src/app/models/**

Contains data models for people, species, planets and films.

**star-wars-app/src/app/services/swapi.service.ts**

This service handles all http requests to `https://swapi.dev/api`.

**star-wars-app/src/app/services/message.service.ts**

This service stores and adds new app messages.

**star-wars-app/src/app/people/**

This component is responsible for fetching data and displaying three character
cards. It initially fetches data from `/people/`, then selects three random
character IDs, fetches their data from `/people/:id` and displays them on the
page. When a character is selected it is handed to the `character-detail`
component.

**star-wars-app/src/app/character-detail/**

This component is responsible for fetching data for a selected character, this
includes relevant data from `/species/:id`, `/planets/:id` and `/films/:id`. The
data is then displayed in a separate box.

**star-wars-app/src/app/messages/**

This component displays the latest app messages in a separate box.

---

This project was generated with
[Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
