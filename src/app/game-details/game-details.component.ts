import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../services/games/games.service';
import { FavoriteService } from '../services/favorite/favorite.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent implements OnInit {
  gameId: string // id do jogo da página
  gameDetails: any // informações do jogo

  slides: any[] = [] // screencshots do jogo

  constructor(private route: ActivatedRoute, private gameService: GamesService, private favoriteService: FavoriteService) { }

  favorited: boolean = false // controla se o jogo foi favoritado ou não

  ngOnInit() {
    this.route.params?.subscribe(params => {
      this.gameId = params['game-id'] // obtem o pathparam
      this.getGameDetails(this.gameId)
      this.favorited = this.favoriteService.isFavorited(parseInt(this.gameId))
    })
  }

  // requisão para obter os dados do jogo
  getGameDetails(id: string) {
    this.gameService.getGameById(id)?.subscribe((game) => {
      this.gameDetails = game
      this.slides = this.gameDetails?.screenshots
    })
  }

  // formata data de yyyy-mm-dd para dd/mm/yyyy
  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  openGamePage(url: string) {
    window.open(url, '_blank')
  }

  // alterna o estado de favorito de um jogo
  toggleFavorited() {
    let { id, title } = this.gameDetails
    if (this.favorited) {
      this.favoriteService.removeFavorite(id)
    } else {
      this.favoriteService.addFavorite({ id, title })
    }
    this.favorited = !this.favorited
  }

}
