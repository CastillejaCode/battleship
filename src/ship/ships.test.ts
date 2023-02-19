import { ships } from './ships';
import { expect, test } from 'vitest';

let ship = ships(2);
ship.getHit();
ship.getHit();

test('hit', () => {
	expect(ship.hits).toBe(2);
});

test('length', () => {
	expect(ship.length).toBe(2);
});

test('sunk', () => {
	expect(ship.isSunk()).toBe(true);
});
