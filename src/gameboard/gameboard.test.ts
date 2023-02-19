import { gameboard } from './gameboard';
import { expect, test } from 'vitest';

let gameboard1 = gameboard();
gameboard1.placeShip([0, 1], [0, 2]);
gameboard1.placeShip([0, 3]);

test('correct coordinate length', () => {
	expect(gameboard1.shipsList[0].coordinates.length).toBe(2);
	expect(gameboard1.shipsList[0].coordinates[1].toString()).toBe('0,2');
});

test('correct coordinate', () => {
	expect(gameboard1.shipsList[0].coordinates[0]).toEqual([0, 1]);
});

test('ship was placed', () => {
	expect(gameboard1.shipsList[0].coordinates).toEqual([
		[0, 1],
		[0, 2],
	]);
});

test('ship exists', () => {
	expect(gameboard1.shipsList[0].ship).toBeTypeOf('object');
	expect(gameboard1.shipsList[0].ship).toBeDefined();
});

test('ship is correct length', () => {
	expect(gameboard1.shipsList[0].ship.length).toBe(2);
});

test('ship was hit', () => {
	gameboard1.receiveAttack([0, 1]);
	expect(gameboard1.shipsList[0].ship.hits).toBe(1);
});

test('ship was missed', () => {
	expect(gameboard1.missedList).toHaveLength(0);
});

// test('all ships sunk', () => {
// 	gameboard1.receiveAttack([0, 2]);
// 	gameboard1.receiveAttack([0, 3]);
// 	expect(gameboard1.checkAllSunk()).toBeTruthy();
// });
