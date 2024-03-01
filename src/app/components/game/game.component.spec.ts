import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.game = {
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
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
