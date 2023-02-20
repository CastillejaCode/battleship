import { gameboard } from '../gameboard/gameboard';

export const player1 = {
	gameboard: gameboard(),
	attack(coord: number[]) {
		player2.gameboard.receiveAttack(coord);
	},
};

export const player2 = {
	gameboard: gameboard(),
	attack(coord: number[]) {
		// let coord = [Math.floor(Math.random() * 11), Math.floor(Math.random() * 11)];
		// for (let i of player1.gameboard.missedList) {
		// 	if (coord.toString() === i.toString()) {
		// 		coord;
		// 	}
		// }
		player1.gameboard.receiveAttack(coord);
	},
};
