import { player1, player2 } from '../player/player';

interface Gameboard {
	shipsList: [];
	missedList: [];
	hitList: [];
}

interface Player {
	gameboard: Gameboard;
}

export function domInteraction() {
	return {
		updateMyGameboard(player: Player) {
			document
				.querySelectorAll('.your-grid > .col > .row')
				.forEach((ele) => ele.classList.remove('bg-gray-900', 'bg-blue-300', 'bg-red-900'));

			for (let i of player.gameboard.shipsList) {
				for (let j of i.coordinates) {
					document.querySelector(`.your-grid > [data-x='${j[0]}'] > [data-y='${j[1]}']`)?.classList.add('bg-gray-900');
				}
			}
			for (let i of player.gameboard.missedList) {
				let grid = document.querySelector(`.your-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);
				grid?.classList.remove('bg-gray-900');
				grid?.classList.add('bg-blue-300');
				// grid.textContent = 'O';
			}
			for (let i of player.gameboard.hitList) {
				let grid = document.querySelector(`.your-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);
				grid?.classList.remove('bg-gray-900');
				grid?.classList.add('bg-red-900');
			}
		},

		updateEnemyGameboard(player: Player) {
			document
				.querySelectorAll('.enemy-grid > .col > .row')
				.forEach((ele) => ele.classList.remove('bg-gray-900', 'bg-blue-300', 'bg-red-900'));
			for (let i of player.gameboard.missedList) {
				let grid = document.querySelector(`.enemy-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);

				grid?.classList.add('bg-blue-300');
				// grid.textContent = 'O';
			}
			for (let i of player.gameboard.hitList) {
				let grid = document.querySelector(`.enemy-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);
				grid?.classList.add('bg-red-900');
			}
		},

		updateGameboards(us: object) {
			if (us === player1) {
				console.log(123);
				this.updateMyGameboard(us);
				this.updateEnemyGameboard(player2);
			} else {
				console.log(4);
				this.updateMyGameboard(player2);
				this.updateEnemyGameboard(player1);
			}
		},
	};
}
