import { Component, OnInit, ViewChild } from '@angular/core';
import { GamesService } from '../services/games/games.service';
import { MatPaginator } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import { Favorite, FavoriteService } from '../services/favorite/favorite.service';
import { Game } from '../shared/game.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // opcoes de categorios de jogos disponiveis
  genres: any[] = [
    { option: 'MMO', selected: false, value: 'mmo' },
    { option: 'MMORPG', selected: false, value: 'mmorpg' },
    { option: 'Shooter', selected: false, value: 'shooter' },
    { option: 'Strategy', selected: false, value: 'strategy' },
    { option: 'Moba', selected: false, value: 'moba' },
    { option: 'Battle Royale', selected: false, value: 'battle-royale' },
    { option: 'Card', selected: false, value: 'card' },
    { option: 'Racing', selected: false, value: 'racing' },
    { option: 'Sports', selected: false, value: 'sports' },
    { option: 'Social', selected: false, value: 'social' },
    { option: 'Fighting', selected: false, value: 'fighting' }
  ]

  // plataformas disponivies 
  platforms: any[] = [
    { option: 'PC', selected: false, value: 'pc' },
    { option: 'Navegador', selected: false, value: 'browser' }
  ]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private gamesService: GamesService, private favoritedService: FavoriteService) { }

  // variaveis de controle
  releaseYear: string = ''
  onlyFavorited: boolean = false
  selectedSortOption: string = ''
  selectedGenre: string = ''
  selectedPlatform: string = ''

  // armazena o jogos(apenas id e nome) que estao armazenados localmente no navegador
  favoritedGamesId: Favorite[] = []

  // armazend propiamente os jogos favoritados
  favoritedGames: Game[] = []

  // jogos obtidos nas requisoes a api
  games: any = []

  // variavel de controle do paginator
  pagination: any = {
    length: 0,
    page: 0,
    pageSize: 6
  }

  ngOnInit() {
    // configuracao do paginator
    this.paginator._intl.itemsPerPageLabel = "Itens por página:"
    this.paginator._intl.nextPageLabel = '';
    this.paginator._intl.previousPageLabel = '';

    // requisao a api para obter os jogos
    this.gamesService.getGames().subscribe((games) => {
      this.games = games
      this.pagination.length = this.games.length
    })

    this.favoritedGamesId = this.favoritedService.getFavorites()
  }

  // funcao para paginacao
  handlePageEvent(event: any) {
    this.pagination.page = event.pageIndex
  }

  // lida com as mudancas nos filtrosde plataforma e categoria
  handleChange(filter: string, value: string) {
    // seleciona o filtro  em questao
    const items = filter === 'category' ? this.genres : this.platforms
    const selectedItem = items.find(item => item.option === value)


    items.forEach(item => {
      item.selected = item === selectedItem // necessario para que apenas um checkbox esteja ativo ao mesmo tempo
    })

    // armazena os filtros para serem utilizados na requisao a api
    if (filter === 'category') {
      this.selectedGenre = this.selectedGenre ? '' : selectedItem.value
    } else {
      this.selectedPlatform = this.selectedPlatform ? '' : selectedItem.value
    }

    this.getGames()
  }

  // faz a requisicao a api
  getGames(year?: string) {
    let params = new HttpParams()
    // seleciona os parametros que serao enviados
    if (this.selectedGenre) params = params.set('category', this.selectedGenre)
    if (this.selectedPlatform) params = params.set('platform', this.selectedPlatform)
    if (this.selectedSortOption) params = params.set('sort-by', this.selectedSortOption)

    this.gamesService.getGames(params).subscribe((games) => {
      this.games = games
      // como nao ha filtragem por ano nativa na api foi implementado dessa maneira no front
      if (year) {
        this.games = this.games.filter(game => {
          return game.release_date.split('-')[0] == this.releaseYear
        })
      }
      this.pagination.length = this.games.length
    })

    this.pagination.page = 0
  }

  // lida com as mdanças no filtro de ano de lancamento
  onReleaseYearChange() {
    const numericRegex = /^[0-9]+$/
    if (numericRegex.test(this.releaseYear)) {
      const year = parseInt(this.releaseYear)
      if (year > 1950) {
        this.getGames(this.releaseYear)
      }
    }
  }

  // exibe apenas favoritos
  handleFavoritedChange() {
    if (this.onlyFavorited) {
      this.favoritedGames = this.getFavoritedGames()
      this.pagination.length = this.favoritedGames.length
    } else {
      this.pagination.length = this.games.length
    }
  }

  getFavoritedGames(): Game[] {
    return this.games.filter((game: Game) => this.favoritedService.isFavorited(game.id))
  }  

  // lida com a mudança do metodo de ordenacao
  sortBy() {
    console.log(this.selectedSortOption)
    this.getGames()
  }

}
