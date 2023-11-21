import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heros';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  // template: `<h1>Hello</h1>`,
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {


  heroes: Hero[] = [];
  selectedHero?: Hero;

  // hero: Hero = {
  //     id: 1,
  //     name: 'Windstorm'
  // };

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // this.heroes = this.heroService.getHeros();
    this.heroService.getHeros().subscribe(heroes => this.heroes = heroes);
  }

  onSelected(hero: Hero): void {
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id} and name=${hero.name}`);
    this.selectedHero = hero;
  }

}
