import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameDetailsComponent } from './game-details/game-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':game-id',
    component: GameDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
