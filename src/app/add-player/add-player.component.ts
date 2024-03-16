import { Component } from '@angular/core';
import { Player } from '../models/Player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {
  constructor(private playerService: PlayerService) { }
  player: Player = {
    idPlayer: 0,
    contratEnd: '',
    contratStart: '',
    countryOfResidence: '',
    dateOfBirth: '',
    discordId: '',
    inGameName: '',
    jerseySize: '',
    leagalefullname: '',
    mailAdress: '',
    salary: 0,
    socialMediaLinks: '',
    whatsappPhone: '',
    teamName: ''
  };
  onSubmit(): void {
    this.playerService.createPlayer(this.player).subscribe({
      next: (player) => console.log(player),
      error: (error) => console.error(error),
      complete: () => console.info('Player added/updated successfully')
    });
  }
}
