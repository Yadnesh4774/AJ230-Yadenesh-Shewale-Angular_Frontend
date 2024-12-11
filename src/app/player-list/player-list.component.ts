// player-list.component.ts
import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Router } from '@angular/router';
import { Player } from '../model/player.model'; // Import the Player model
import { FormControl } from '@angular/forms'; // Import FormControl for user input

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];  // Use the Player model here
  searchSuffix: FormControl = new FormControl(''); // For user input

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlayers();  // Load all players initially
  }

  loadPlayers(): void {
    this.playerService.getAllPlayers().subscribe((data: Player[]) => {
      this.players = data;
    });
  }

  searchPlayersBySuffix(): void {
    const suffix = this.searchSuffix.value;
    if (suffix) {
      this.playerService.getPlayersByNameEndingWith(suffix).subscribe((data: Player[]) => {
        this.players = data;
      });
    } else {
      this.loadPlayers();  // If no suffix is provided, load all players
    }
  }

  deletePlayer(id: number): void {
    if (confirm('Are you sure you want to delete this player?')) {
      this.playerService.deletePlayer(id).subscribe(() => {
        alert('Player deleted successfully!');
        this.loadPlayers();
      });
    }
  }

  navigateToAddPlayer(): void {
    this.router.navigate(['/player-form']);
  }

  navigateToEditPlayer(id: number): void {
    this.router.navigate(['/player-form', id]);
  }
}
