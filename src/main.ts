import './style.css';
import { dom } from './DOM/DOM';
import { player1, player2 } from './player/player';
import { gameboard } from './gameboard/gameboard';

player1.gameboard.placeShip([0, 1], [0, 2], [0, 0]);

let dom1 = dom();
dom1.updateGameboards();

console.log(player1.gameboard.shipsList);
