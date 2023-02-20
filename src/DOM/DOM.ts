import { player1, player2 } from '../player/player';

export function domInteraction() {
	return {
		updateMyGameboard(player: object) {
			for (let i of player.gameboard.shipsList) {
				for (let j of i.coordinates) {
					document
						.querySelector(`.your-grid > [data-x='${j[0]}'] > [data-y='${j[1]}']`)
						?.classList.add('bg-slate-900/50');
				}
			}
			for (let i of player.gameboard.missedList) {
				let grid = document.querySelector(`.your-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);

				grid?.classList.add('bg-blue-300/50');
				// grid.textContent = 'O';
			}
			for (let i of player.gameboard.hitList) {
				let grid = document.querySelector(`.your-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);
				grid?.classList.add('bg-red-900');
			}
		},

		updateEnemyGameboard(player: object) {
			for (let i of player.gameboard.missedList) {
				let grid = document.querySelector(`.enemy-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);

				grid?.classList.add('bg-blue-300/50');
				// grid.textContent = 'O';
			}
			for (let i of player.gameboard.hitList) {
				let grid = document.querySelector(`.enemy-grid > [data-x='${i[0]}'] > [data-y='${i[1]}']`);
				grid?.classList.add('bg-red-900');
			}
		},

		updateGameboards(us: object, enemy: object = player2) {
			if (us === player2) {
				this.updateMyGameboard(us);
				this.updateEnemyGameboard(player1);
			} else {
				this.updateMyGameboard(us);
				this.updateEnemyGameboard(enemy);
			}
		},
	};
}
