import { Injectable } from '@angular/core';

export interface Favorite {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private localStorageKey = 'favoritos';

  constructor() { }

  getFavorites(): Favorite[] {
    const favoritesString = localStorage.getItem(this.localStorageKey);
    return favoritesString ? JSON.parse(favoritesString) : [];
  }

  addFavorite(favorito: Favorite): Favorite[] {
    const favorites = this.getFavorites();
    favorites.push(favorito);
    localStorage.setItem(this.localStorageKey, JSON.stringify(favorites));
    return this.getFavorites()
  }

  removeFavorite(id: number): Favorite[] {
    let favorites = this.getFavorites();
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(favorites));
    return this.getFavorites()
  }

  isFavorited(id: number): boolean {
    return this.getFavorites().some(f => f.id === id)
  }
 
}
