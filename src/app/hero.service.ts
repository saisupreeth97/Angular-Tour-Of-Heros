import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService, private httpClient: HttpClient) { }

  getHeros(): Observable<Hero[]> {
    const heroes = this.httpClient.get<Hero[]>('http://127.0.0.1:5000/heroes');
    this.messageService.add('The HeroService has fetched the heroes');
    return of(HEROES);
    // return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = this.httpClient.get<Hero>('http://127.0.0.1:5000/detail/'+id.toString());
    this.messageService.add('The HeroService has fetched the hero with id: '+id.toString());
    return hero;
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>('http://127.0.0.1:5000/update', hero);
  }

}
