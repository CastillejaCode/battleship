export function ships(length: number) {
	return {
		length,
		hits: 0,
		getHit() {
			this.hits++;
		},
		sunk: false,
		isSunk() {
			if (this.hits === this.length) {
				return (this.sunk = true);
			} else return this.sunk;
		},
	};
}
