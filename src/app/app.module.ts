import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { httpInterceptorProviders } from './http-interceptors/index';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
    declarations: [AppComponent, PeopleComponent, CharacterDetailComponent, MessagesComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent],
})
export class AppModule {}
