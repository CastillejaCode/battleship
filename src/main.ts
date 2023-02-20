import './style.css';
import { domInteraction } from './DOM/DOM';
import { player1, player2 } from './player/player';

let carrier = [
	[5, 5],
	[5, 6],
	[5, 7],
	[5, 8],
	[5, 9],
];

let battleship = [
	[9, 1],
	[8, 1],
	[7, 1],
	[6, 1],
];

let destroyer = [
	[0, 1],
	[1, 1],
	[2, 1],
];

let submarine = [
	[8, 9],
	[8, 8],
	[8, 7],
];

let patrol = [
	[2, 4],
	[3, 4],
];

let ships = [carrier, battleship, destroyer, submarine, patrol];

function placeAll(ships: any[], player: any) {
	for (let i of ships) {
		player.gameboard.placeShip(...i);
	}
}

placeAll(ships, player1);

player2.gameboard.placeShip([0, 0], [1, 0]);
player2.gameboard.receiveAttack([0, 0]);
player2.gameboard.receiveAttack([9, 9]);
player1.gameboard.receiveAttack([0, 0]);

// player1.gameboard.receiveAttack([9, 9]);
// player1.gameboard.receiveAttack([1, 1]);
// player1.gameboard.receiveAttack([0, 1]);

let dom = domInteraction();
dom.updateGameboards(player1);

// console.log(player1.gameboard.shipsList);
