import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../model/player.model'; // Import the Player model

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm!: FormGroup;
  isEditMode = false;
  playerId!: number;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.playerForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.pattern('([A-Z][a-z]*\\s?)+')]],
      jerseyNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      role: ['', [Validators.required]],
      totalMatches: ['', [Validators.required, Validators.min(1)]],
      teamName: ['', [Validators.required]],
      countryOrStateName: ['', [Validators.required]],
      description: ['']
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.playerId = params['id'];
        
        this.playerService.getPlayerById(this.playerId).subscribe((data: Player) => {
          this.playerForm.patchValue(data);  // Patch form with player data
        });
      }
    });
  }

  savePlayer(): void {
    if (this.playerForm.invalid) {
      alert('Please correct the form!');
      return;
    }

    if (this.isEditMode) {
      this.playerService.updatePlayer(this.playerId, this.playerForm.value).subscribe(
        (response) => {
          alert('Player updated successfully!');
          this.router.navigate(['/players']);
        },
        (error) => {
          alert('An error occurred while updating the player.');
        }
      );
    } else {
      this.playerService.addPlayer(this.playerForm.value).subscribe(
        (response) => {
          alert('Player added successfully!');
          this.router.navigate(['/players']);
        },
        (error) => {
          alert('An error occurred while adding the player.');
        }
      );
    }
  }
}
