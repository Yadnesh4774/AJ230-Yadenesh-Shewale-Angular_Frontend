import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component'; // Correct path without folders
import { PlayerFormComponent } from './player-form/player-form.component'; // Correct path without folders

const routes: Routes = [
  { path: 'players', component: PlayerListComponent },
  { path: 'player-form', component: PlayerFormComponent },
  { path: '', redirectTo: '/players', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
