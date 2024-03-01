import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../shared/game.model';
import { Router } from '@angular/router';
import { Favorite, FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  @Input() game!: Game

  constructor(private router: Router, private favoriteService: FavoriteService) {}

  favorites: Favorite[] = [] // Array para armazenar os jogos favoritos

  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites()
  }

  redirectToGameDetails(id: number) {
    this.router.navigate(['/'+id]) // redireciona para a página do jogo
  }

  addFavorite(event: MouseEvent) {
    event.stopPropagation() // impede a propagação do evento para o elemento pai
    let { id, title } = this.game 
    this.favorites = this.favoriteService.addFavorite({ id, title })
  }

  removeFavorite(event: MouseEvent) {
    event.stopPropagation() // impede a propagação do evento para o elemento pai
    this.favorites = this.favoriteService.removeFavorite(this.game.id)
  }

  isFavorite(): boolean {
    return this.favoriteService.isFavorited(this.game.id)
  }

}
