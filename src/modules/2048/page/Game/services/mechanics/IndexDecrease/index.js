export default class IndexDecrease {
	constructor(tiles, coordinate) {
		this.tiles = tiles;
		this.coordinate = coordinate;
	}

	subsetFormation() {
		let subsets = [];
		let uniqueSecondCoordinate = new Set();
		const searchCoordinate = this.coordinate === 'x' ? 'y' : 'x';

		for (let i = 0; i < this.tiles.length; i++) {
			uniqueSecondCoordinate.add(this.tiles[i][searchCoordinate]);
		}

		for (let value of uniqueSecondCoordinate) {
			subsets.push(
				this.tiles
					.sort((a, b) => a[this.coordinate] - b[this.coordinate])
					.filter((subValue) => subValue[searchCoordinate] === value)
			);
		}

		this.tiles = subsets;
		return this;
	}

	findSameBlocksAndMerge() {
		for (let i = 0; i < this.tiles.length; i++) {
			for (let j = 0; j < this.tiles[i].length - 1; j++) {
				if (this.tiles[i][j].value === this.tiles[i][j + 1].value) {
					this.tiles[i][j].value *= 2;
					this.tiles[i].splice(j + 1, 1);
					break;
				}
			}
		}

		return this;
	}

	moveToFreeSpace() {
		for (let i = 0; i < this.tiles.length; i++) {
			for (let j = 0; j < this.tiles[i].length; j++) {
				this.tiles[i][j][this.coordinate] = j;
			}
		}

		return this;
	}

	subsetIntegration() {
		let newArray = [];
		for (let i = 0; i < this.tiles.length; i++) {
			for (let j = 0; j < this.tiles[i].length; j++) {
				newArray.push(this.tiles[i][j]);
			}
		}

		// TODO: the behavior is confusing.
		return newArray;
	}
}
