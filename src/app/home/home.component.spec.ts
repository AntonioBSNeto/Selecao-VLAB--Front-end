import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { GamesService } from '../services/games/games.service';
import { GameComponent } from '../components/game/game.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: GamesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, GameComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule, FormsModule], 
      providers: [GamesService]
    })
    .compileComponents();

    service = TestBed.inject(GamesService);
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // user history 1
  it('should display list of games', () => {
    // Mock data
    component.games = [
      {
        "id": 540,
        "title": "Overwatch 2",
        "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
        "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
        "game_url": "https://www.freetogame.com/open/overwatch-2",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "Activision Blizzard",
        "developer": "Blizzard Entertainment",
        "release_date": "2022-10-04",
        "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
      },
      {
        "id": 521,
        "title": "Diablo Immortal",
        "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
        "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
        "game_url": "https://www.freetogame.com/open/diablo-immortal",
        "genre": "MMOARPG",
        "platform": "PC (Windows)",
        "publisher": "Blizzard Entertainment",
        "developer": "Blizzard Entertainment",
        "release_date": "2022-06-02",
        "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
      },
      {
        "id": 517,
        "title": "Lost Ark",
        "thumbnail": "https://www.freetogame.com/g/517/thumbnail.jpg",
        "short_description": "Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
        "game_url": "https://www.freetogame.com/open/lost-ark",
        "genre": "ARPG",
        "platform": "PC (Windows)",
        "publisher": "Amazon Games",
        "developer": "Smilegate RPG",
        "release_date": "2022-02-11",
        "freetogame_profile_url": "https://www.freetogame.com/lost-ark"
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const gameElements = compiled.querySelectorAll('.card-container');
    expect(gameElements.length).toBe(3); 

    expect(gameElements[0].textContent).toContain('Overwatch 2');
    expect(gameElements[2].textContent).toContain('Lost Ark');

    const gameElementsPlataform = compiled.querySelectorAll('.card-container svg');

    expect(gameElementsPlataform[0].getAttribute('alt')).toContain('Windows');
    expect(gameElementsPlataform[2].getAttribute('alt')).toContain('Windows');

    const imageGameElements = compiled.querySelectorAll('.card-container img');
    expect(imageGameElements.length).toBe(3);
    expect(imageGameElements[0].src).toContain('.jpg');
    expect(imageGameElements[2].src).toContain('.jpg');
  });


  // user history 2
  it('should display filters', () => {
    const compiled = fixture.nativeElement;
    const filtersElement = compiled.querySelectorAll('.filter');

    expect(filtersElement[0].textContent).toContain('Plataforma');
    expect(filtersElement[0].textContent).toContain('PC');
    expect(filtersElement[2].textContent).toContain('Categoria');
    expect(filtersElement[2].textContent).toContain('MMO');
    expect(filtersElement[2].textContent).toContain('Racing');
    expect(filtersElement[2].textContent).toContain('Battle Royale');
    expect(filtersElement[3].textContent).toContain('Ano de Lançamento');
  })

  //user histor 4
  it('should be stored locally', () => {
    // Mock data
    component.games = [
      {
        "id": 540,
        "title": "Overwatch 2",
        "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
        "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
        "game_url": "https://www.freetogame.com/open/overwatch-2",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "Activision Blizzard",
        "developer": "Blizzard Entertainment",
        "release_date": "2022-10-04",
        "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
      },
      {
        "id": 521,
        "title": "Diablo Immortal",
        "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
        "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
        "game_url": "https://www.freetogame.com/open/diablo-immortal",
        "genre": "MMOARPG",
        "platform": "PC (Windows)",
        "publisher": "Blizzard Entertainment",
        "developer": "Blizzard Entertainment",
        "release_date": "2022-06-02",
        "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
      },
      {
        "id": 517,
        "title": "Lost Ark",
        "thumbnail": "https://www.freetogame.com/g/517/thumbnail.jpg",
        "short_description": "Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
        "game_url": "https://www.freetogame.com/open/lost-ark",
        "genre": "ARPG",
        "platform": "PC (Windows)",
        "publisher": "Amazon Games",
        "developer": "Smilegate RPG",
        "release_date": "2022-02-11",
        "freetogame_profile_url": "https://www.freetogame.com/lost-ark"
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const gameElements = compiled.querySelectorAll('.card-container .favorited-icon i');
    
    gameElements[2].dispatchEvent(new MouseEvent('click'));

    const favoritedFilterElement = compiled.querySelector('#favorited-checkbox');
    favoritedFilterElement.dispatchEvent(new MouseEvent('click'));

    const gamefavoritedElements = compiled.querySelectorAll('.card-container');
    expect(gamefavoritedElements.length).toBe(1);


  });

});
