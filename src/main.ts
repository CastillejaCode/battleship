import './style.css';
import { domInteraction } from './DOM/DOM';
import { player1, player2 } from './player/player';
import { animate } from 'motion';

let buttonFire = document.querySelector('.fire');
let buttonConfirm = document.querySelector('.confirm');
let grid = document.querySelectorAll(' .your-grid  .row');
let allColumns = document.querySelectorAll('.col');

// let carrier = [
// 	[5, 5],
// 	[5, 6],
// 	[5, 7],
// 	[5, 8],
// 	[5, 9],
// ];

// let battleship = [
// 	[9, 1],
// 	[8, 1],
// 	[7, 1],
// 	[6, 1],
// ];

// let destroyer = [
// 	[0, 1],
// 	[1, 1],
// 	[2, 1],
// ];

// let submarine = [
// 	[8, 9],
// 	[8, 8],
// 	[8, 7],
// ];

// let patrol = [
// 	[2, 4],
// 	[3, 4],
// ];

function placeAll() {
	for (let i of ships1) {
		player1.gameboard.placeShip(...i);
	}
	for (let i of ships2) {
		player2.gameboard.placeShip(...i);
	}
}

let dom = domInteraction();

function init() {
	placeAll();
	dom.updateGameboards(player1);
}

let ships1: [] = [];
let ships2: [] = [];

let coord: number[];
let turn = true;
let end = false;

function readGrid() {
	let array: [] = [];

	allColumns.forEach((e) =>
		e.querySelectorAll('.row').forEach((ele) => {
			if (ele.classList.contains('bg-gray-800')) {
				array.push([ele.closest('.col').dataset.x, ele.dataset.y]);
			}
		})
	);
	if (turn) {
		ships1.push(array);
	} else ships2.push(array);
}

buttonConfirm?.addEventListener('click', () => {
	let i: number = 0;
	readGrid();
	allColumns.forEach((e) =>
		e.querySelectorAll('.row').forEach((ele) => {
			if (ele.classList.contains('bg-gray-800')) {
				ele.classList.remove('bg-gray-800');
				ele.classList.add('bg-gray-900');
			}
		})
	);
	allColumns.forEach((e) =>
		e.querySelectorAll('.row').forEach((ele) => {
			if (ele.classList.contains('bg-gray-900')) {
				++i;
				if (i === 2 && !turn) {
					turn = !turn;
					document.querySelector('.name-your-grid')?.classList.add('hidden');
					init();
					document.querySelector('.enemy-grid')?.classList.remove('hidden');
					document.querySelector('.middle')?.classList.remove('hidden');
					buttonConfirm.classList.add('hidden');
				} else if (i === 2) {
					turn = !turn;
					document.querySelector('.name-your-grid').textContent = 'Player 2';
					allColumns.forEach((e) =>
						e.querySelectorAll('.row').forEach((ele) => {
							ele.classList.remove('bg-gray-900');
						})
					);
				}
			}
		})
	);
});

// function toggleGray800(e) {
// 	e.classList.toggle('bg-gray-800');
// }

grid.forEach((e) =>
	e.addEventListener('click', () => {
		e.classList.toggle('bg-gray-800');
	})
);

// buttonConfirm?.addEventListener('click', () => {
// 	player1.gameboard.placeShip(...carrier1);
// 	dom.updateMyGameboard(player1);
// });

// document.querySelector('.your-grid')?.addEventListener('mouseover', (e) => {
// 	e.target.classList.add('bg-gray-900');
// });

document.querySelector('.enemy-grid')?.addEventListener('click', (e) => {
	if (e.target.tagName == 'I') return;
	document.querySelectorAll('.enemy-grid > .col > .row').forEach((ele) => ele.classList.remove('bg-gray-900'));
	coord = [parseInt(e.target?.closest('.col').dataset.x), parseInt(e.target.dataset.y)];
	e.target?.classList.add('bg-gray-900');
	buttonFire?.classList.remove('invisible');
});

buttonFire?.addEventListener('click', () => {
	if (end) {
		document.querySelectorAll('.middle > h1').forEach((e) => e.classList.add('invisible'));

		document.querySelector('.your-grid')?.classList.add('opacity-0');
		document.querySelector('.enemy-grid')?.classList.add('opacity-0');

		animate((progress) => (buttonFire.innerHTML = Math.round(progress * 5).toString()), {
			duration: 1,
			easing: 'linear',
			direction: 'reverse',
		});

		setTimeout(() => {
			document.querySelector('.your-grid')?.classList.remove('opacity-0');
			document.querySelector('.enemy-grid')?.classList.remove('opacity-0');

			document
				.querySelectorAll('.enemy-grid > .col > .row')
				.forEach((ele) => ele.classList.remove('bg-red-900', 'bg-blue-300'));
			buttonFire?.classList.add('invisible');
			buttonFire.innerHTML = '<i class="fa-solid fa-explosion"></i>';
			document.querySelector('.ships-left-1')?.classList.toggle('invisible');
			document.querySelector('.ships-left-2')?.classList.toggle('invisible');

			if (turn) {
				dom.updateGameboards(player1);
			} else {
				dom.updateGameboards(player2);
			}
		}, 1000);

		end = false;
	} else {
		// Remove square selection
		document.querySelectorAll('.enemy-grid > .col > .row').forEach((ele) => ele.classList.remove('bg-gray-900'));

		if (turn) {
			player1.attack(coord);
			dom.updateGameboards(player1);
		} else {
			player2.attack(coord);
			dom.updateGameboards(player2);
		}

		turn = !turn;

		buttonFire.innerHTML = '<i class="fa-solid fa-repeat"></i>';

		end = true;
	}
});

// player1.gameboard.receiveAttack([9, 9]);
// player1.gameboard.receiveAttack([1, 1]);
// player1.gameboard.receiveAttack([0, 1]);

// console.log(player1.gameboard.shipsList);
