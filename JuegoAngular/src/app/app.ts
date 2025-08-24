import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('JuegoAngular');

  turn = 1;

  player1 = {
    name: 'Drácula',
    health: 100,
    defend: false,
    continue: false,
  };

  player2 = {
    name: 'Frankenstein',
    health: 100,
    defend: false,
    continue: false,
  };

  attack(player: number) {
    if (player === 1) {
      if (this.player2.defend) {
        alert(`${this.player2.name} se ha defendido del ataque de ${this.player1.name}.`);
        this.player2.defend = false;
      } else {
        this.player2.health -= 10;
        alert(`${this.player1.name} ha atacado a ${this.player2.name}. Salud: ${this.player2.health}`);
      }
      this.turn = 2;
    } else {
      if (this.player1.defend) {
        alert(`${this.player1.name} se ha defendido del ataque de ${this.player2.name}.`);
        this.player1.defend = false;
      } else {
        this.player1.health -= 10;
        alert(`${this.player2.name} ha atacado a ${this.player1.name}. Salud: ${this.player1.health}`);
      }
      this.turn = 1;
    }
  }

  defend(player: number) {
    if (player === 1 && !this.player1.continue) {
      this.player1.defend = true;
      this.player1.continue = true;
      alert(`${this.player1.name} se ha defendido.`);
      this.turn = 2;
    } else if (player === 2 && !this.player2.continue) {
      this.player2.defend = true;
      this.player2.continue = true;
      alert(`${this.player2.name} se ha defendido.`);
      this.turn = 1;
    } else {
      alert("Ya usaste tu defensa.");
    }
  }
}
