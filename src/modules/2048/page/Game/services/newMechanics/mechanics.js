export default class IndexDecrease {
	constructor(data, coordinate) {
		this.data = data;
		this.coordinate = coordinate;
	}

	subsetFormation() {
		let subsets = [];
		let uniqueSecondCoordinate = new Set();
		const searchCoordinate = this.coordinate === 'x' ? 'y' : 'x';

		for (let i = 0; i < this.data.length; i++) {
			uniqueSecondCoordinate.add(this.data[i][searchCoordinate]);
		}

		for (let value of uniqueSecondCoordinate) {
			subsets.push(
				this.data
					.sort((a, b) => a[this.coordinate] - b[this.coordinate])
					.filter((subValue) => subValue[searchCoordinate] === value)
			);
		}

		this.data = subsets;
		return this;
	}

	findSameBlocksAndMerge() {
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].length - 1; j++) {
				if (this.data[i][j].value === this.data[i][j + 1].value) {
					this.data[i][j].value *= 2;
					this.data[i].splice(j + 1, 1);
					break;
				}
			}
		}

		return this;
	}

	moveToFreeSpace() {
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].length; j++) {
				this.data[i][j][this.coordinate] = j;
			}
		}

		return this;
	}

	subsetIntegration() {
		let newArray = [];
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].length; j++) {
				newArray.push(this.data[i][j]);
			}
		}

		return newArray;
	}
}
