import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { GameDetailsComponent } from './game-details.component';
import { GamesService } from '../services/games/games.service';
import { CarouselComponent } from '../components/carousel/carousel.component';

describe('GameDetailsComponent', () => {
  let component: GameDetailsComponent;
  let fixture: ComponentFixture<GameDetailsComponent>;
  let service: GamesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameDetailsComponent, CarouselComponent],
      imports: [HttpClientTestingModule],
      providers: [GamesService, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({ 'game-id': 540 }) // You can provide any required paramMap here
          }
        }
      }]
    })
      .compileComponents();

    service = TestBed.inject(GamesService);

    fixture = TestBed.createComponent(GameDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show game details', () => {
    component.gameDetails = {
      "id": 540,
      "title": "Overwatch 2",
      "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
      "status": "Live",
      "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
      "description": "The tale of the hero organization Overwatch continues in Overwatch 2. This new take on the popular team shooter changes up things a little with five-man teams, redefined classes, and new playable characters. With the adjustment to 5v5, players now have more individual impact than in the previous game.\r\n\r\nChallenge yourself in all-new modes. Take control of a robot with your team in Push and take it to the enemy base before the enemy can take it from you. Explore all new areas, including iconic real-world cities such as New York, Rome, Monte Carlo, Toronto, and more.\r\n\r\nOverwatch 2 features an update schedule that drops new content every nine weeks. It also boasts a regular battle pass – both free and premium. This is where some of the game’s characters will be obtained.",
      "game_url": "https://www.freetogame.com/open/overwatch-2",
      "genre": "Shooter",
      "platform": "Windows",
      "publisher": "Activision Blizzard",
      "developer": "Blizzard Entertainment",
      "release_date": "2022-10-04",
      "freetogame_profile_url": "https://www.freetogame.com/overwatch-2",
      "minimum_system_requirements": {
        "os": "Windows 10 64-bit",
        "processor": "Intel Core i3 or AMD Phenom X3 8650",
        "memory": "6 GB",
        "graphics": "NVIDIA GeForce GTX 600 series or AMD Radeon HD 7000 series",
        "storage": "50 GB"
      },
      "screenshots": [
        {
          "id": 1334,
          "image": "https://www.freetogame.com/g/540/overwatch-2-1.jpg"
        },
        {
          "id": 1335,
          "image": "https://www.freetogame.com/g/540/overwatch-2-2.jpg"
        },
        {
          "id": 1336,
          "image": "https://www.freetogame.com/g/540/overwatch-2-3.jpg"
        }
      ]
    }

    component.slides = [
      {
        "id": 1334,
        "image": "https://www.freetogame.com/g/540/overwatch-2-1.jpg"
      },
      {
        "id": 1335,
        "image": "https://www.freetogame.com/g/540/overwatch-2-2.jpg"
      },
      {
        "id": 1336,
        "image": "https://www.freetogame.com/g/540/overwatch-2-3.jpg"
      }
    ]

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const gameElements = compiled.querySelector('.game-details-header');
    expect(gameElements.textContent).toContain('Overwatch 2');
    expect(gameElements.textContent).toContain('Windows');

    const gameElementsThumb = compiled.querySelector('.game-details-header img');
    expect(gameElementsThumb.src).toContain('thumbnail');

    const gameElementsScreenshots = compiled.querySelectorAll('.game-carousel img');
    expect(gameElementsScreenshots.length).toBe(3);
    expect(gameElementsScreenshots[0].src).toContain('.jpg');
    expect(gameElementsScreenshots[2].src).toContain('.jpg');

    const gameElementsDetails = compiled.querySelector('.game-details');
    expect(gameElementsDetails.textContent).toContain('03/10/2022');
    expect(gameElementsDetails.textContent).toContain('The tale of the hero organization Overwatch continues in Overwatch 2.');
    expect(gameElementsDetails.textContent).toContain('Blizzard Entertainment');
    expect(gameElementsDetails.textContent).toContain('Activision Blizzard');
    expect(gameElementsDetails.textContent).toContain('Intel Core i3 or AMD Phenom X3 8650');


  });
});
