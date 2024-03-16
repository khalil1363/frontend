import { Component, OnInit } from '@angular/core';
import { Player } from '../models/Player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];


  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }



  getAllPlayers(): void {
    this.playerService.getAllPlayers().subscribe({
      next: (players) => {
        this.players = players;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deletePlayer(playerId: number): void {
    if(confirm('Are you sure you want to delete this player?')) {
      this.playerService.deletePlayer(playerId).subscribe({
        next: () => {
          console.log('Player deleted successfully');
          // Adjusted to use idPlayer
          this.players = this.players.filter(player => player.idPlayer !== playerId);
        },
        error: (error) => console.error('Error deleting player:', error)
      });
    }
  }
  updatePlayer(player: Player): void {
    // Assuming a modal or form populates an updatedPlayer object
    // This is a placeholder to illustrate the process
    const updatedPlayer = {...player, inGameName: 'UpdatedName'}; // Example modification
    // Adjusted to use idPlayer
    if (player.idPlayer) {
      this.playerService.updatePlayer(player.idPlayer, updatedPlayer).subscribe({
        next: (updated) => {
          console.log('Player updated:', updated);
          this.getAllPlayers(); // Refresh the list
        },
        error: (error) => console.error('Error updating player:', error)
      });
    }
  }
  

  
}
