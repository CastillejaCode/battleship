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
				grid.innerHTML = '<i class="fa-solid fa-water"></i>';

				// grid.textContent = 'O';
			}
			for (let i of player.gameboard.hitList) {
				let grid = document.querySelector(`.your-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);
				grid?.classList.remove('bg-gray-900');
				grid?.classList.add('bg-red-900');
				grid.innerHTML = '<i class="fa-solid fa-burst"></i>';
			}
		},

		updateEnemyGameboard(player: Player) {
			document
				.querySelectorAll('.enemy-grid > .col > .row')
				.forEach((ele) => ele.classList.remove('bg-gray-900', 'bg-blue-300', 'bg-red-900'));
			document.querySelectorAll('.enemy-grid > .col > .row').forEach((ele) => (ele.innerHTML = ''));
			for (let i of player.gameboard.missedList) {
				let grid = document.querySelector(`.enemy-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);

				grid?.classList.add('bg-blue-300');
				grid.innerHTML = '<i class="fa-solid fa-water"></i>';

				// grid.textContent = 'O';
			}
			for (let i of player.gameboard.hitList) {
				let grid = document.querySelector(`.enemy-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);
				grid?.classList.add('bg-red-900');
				grid.innerHTML = '<i class="fa-solid fa-burst"></i>';
			}
		},

		updateGameboards(us: object) {
			if (us === player1) {
				this.updateMyGameboard(us);
				this.updateEnemyGameboard(player2);
			} else {
				this.updateMyGameboard(player2);
				this.updateEnemyGameboard(player1);
			}
		},
	};
}
