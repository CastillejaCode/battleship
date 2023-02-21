import { ships } from '../ship/ships';

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

export function gameboard() {
	let shipsList: { coordinates: any[]; ship: Ships }[] = [];
	let missedList: unknown[] = [];
	let hitList: unknown[] = [];
	// let checkAllSunk = () => shipsList.every((element) => element.ship.isSunk());
	return {
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
						if (i.ship.sunk) console.log(123);
						this.hitList.push(coords);
						hit = true;
					}
				}
			}
			if (!hit) this.missedList.push(coords);
		},
	};
}
