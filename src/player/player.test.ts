import { player1, player2 } from './player';
import { expect, test } from 'vitest';

// const player1 = players();
player2.gameboard.placeShip([0, 1]);
player1.attack([0, 1]);

test('player can attack other ship', () => {
	expect(player2.gameboard.shipsList[0].ship.hits).toBe(1);
});

player2.attack();
test('AI can make random attack', () => {
	expect(player1.gameboard.missedList).toHaveLength(1);
});
