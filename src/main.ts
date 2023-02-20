import './style.css';
import { domInteraction } from './DOM/DOM';
import { player1, player2 } from './player/player';

let buttonConfirm = document.querySelector('button');

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

let ships1 = [carrier, battleship, destroyer, submarine, patrol];
let ships2 = [
	carrier,
	battleship,
	destroyer,
	submarine,
	[
		[0, 9],
		[0, 8],
	],
];

function placeAll() {
	for (let i of ships1) {
		player1.gameboard.placeShip(...i);
	}
	for (let i of ships2) {
		player2.gameboard.placeShip(...i);
	}
}

(function init() {
	placeAll();
})();

let coord: number[];
let turn = player2;

document.querySelector('.enemy-grid')?.addEventListener('click', (e) => {
	document.querySelectorAll('.enemy-grid > .col > .row').forEach((ele) => ele.classList.remove('bg-gray-900'));
	coord = [parseInt(e.target?.closest('.col').dataset.x), parseInt(e.target.dataset.y)];
	e.target?.classList.add('bg-gray-900');
	buttonConfirm?.classList.remove('invisible');
});

buttonConfirm?.addEventListener('click', () => {
	document.querySelectorAll('.enemy-grid > .col > .row').forEach((ele) => ele.classList.remove('bg-gray-900'));
	player1.attack(coord);
	dom.updateGameboards(player1);
	buttonConfirm?.classList.add('invisible');
});

// player1.gameboard.receiveAttack([9, 9]);
// player1.gameboard.receiveAttack([1, 1]);
// player1.gameboard.receiveAttack([0, 1]);

let dom = domInteraction();
dom.updateGameboards(player1);

// console.log(player1.gameboard.shipsList);
