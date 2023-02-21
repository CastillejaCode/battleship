import { ships } from '../ship/ships';
import { animate, spring } from 'motion';
import 'animate.css';

// interface CoordObject {
//     coordinates: [],
//     ship: object,
// }

interface Ships {
	length: number;
	hits: number;
	hitCoords: number[];
	getHit: Function;
	sunk: boolean;
	isSunk: Function;
}

export function gameboard(player: 1 | 2) {
	let shipsList: { coordinates: any[]; ship: Ships }[] = [];
	let missedList: unknown[] = [];
	let hitList: unknown[] = [];
	// let checkAllSunk = () => shipsList.every((element) => element.ship.isSunk());
	return {
		player,
		shipsList,
		missedList,
		hitList,
		placeShip(...coords: any[]) {
			this.shipsList.push({ coordinates: [...coords], ship: ships([...coords].length) });
		},
		receiveAttack(coords: number[]) {
			let hit = false;
			for (let i of this.shipsList) {
				for (let j of i.coordinates) {
					if (j.toString() == coords.toString()) {
						i.ship.getHit();
						i.ship.isSunk();
						if (i.ship.sunk) {
							// animate('.enemy-grid', { scale: 1.2 }, { easing: spring() });
							// setTimeout(() => animate('.enemy-grid', { scale: 1 }, { easing: spring() }), 1000);
							document.querySelector('.enemy-grid')?.classList.add('animate__headShake');
							setTimeout(() => document.querySelector('.enemy-grid')?.classList.remove('animate__headShake'), 1000);

							document.querySelectorAll('.middle > h1').forEach((e) => e.classList.remove('invisible'));

							document
								.querySelector(`.ships-left-${this.player.toString()} > [data-length='${i.ship.length.toString()}']`)
								?.remove();
						}
						this.hitList.push(coords);
						hit = true;
					}
				}
			}
			if (!hit) this.missedList.push(coords);
		},
	};
}
