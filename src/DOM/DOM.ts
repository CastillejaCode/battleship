import { player1 } from '../player/player';

export function dom() {
	let gameboard = document.querySelector('.your-board');

	return {
		updateGameboards() {
			for (let i of player1.gameboard.shipsList)
				for (let j of i.coordinates) {
					document
						.querySelector(`.your-grid > [data-x='${j[0]}'] > [data-y='${j[1]}']`)
						?.classList.add('bg-slate-900/50');
				}
		},
	};
}
