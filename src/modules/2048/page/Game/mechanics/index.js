// ---------- MECHANICS
// TODO: refactor

export function subsetFormation(tiles, coordinate) {
	let subsets = [];
	let uniqueSecondCoordinate = new Set();
	const searchCoordinate = coordinate === 'x' ? 'y' : 'x';

	for (let i = 0; i < tiles.length; i++) {
		uniqueSecondCoordinate.add(tiles[i][searchCoordinate]);
	}

	for (let value of uniqueSecondCoordinate) {
		subsets.push(
			tiles
				.filter((subValue) => subValue[searchCoordinate] === value)
				.sort((a, b) => a[coordinate] - b[coordinate])
		);
	}

	return subsets;
}

export function subsetIntegration(tiles) {
	let flat = [];
	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[i].length; j++) {
			flat.push(tiles[i][j]);
		}
	}

	return flat;
}

export function tileGeneration(tiles, { width, height }) {
	let target = true;
	let _tiles = [...tiles];
	while (target) {
		let xСoordinate = Math.floor(Math.random() * width);
		let yСoordinate = Math.floor(Math.random() * height);

		target = _tiles.find((tile) => tile.x === xСoordinate && tile.y === yСoordinate);

		if (!target) {
			_tiles.push({
				x: xСoordinate,
				y: yСoordinate,
				value: 2,
			});

			return _tiles;
		}
	}
}

// ------------- IndexDecrease

export function decreaseMoveToFreeSpace(tiles, coordinate) {
	let _tiles = [...tiles];

	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[i].length; j++) {
			tiles[i][j][coordinate] = j;
		}
	}

	return _tiles;
}

export function decreaseFindSameBlocksAndMerge(tiles) {
	let _tiles = [...tiles];
	for (let i = 0; i < _tiles.length; i++) {
		for (let j = 0; j < _tiles[i].length - 1; j++) {
			if (_tiles[i][j].value === _tiles[i][j + 1].value) {
				_tiles[i][j].value *= 2;
				_tiles[i].splice(j + 1, 1);
				break;
			}
		}
	}

	return _tiles;
}

// -------------- IndexIncrease

export function increaseMoveToFreeSpace(tiles, size, coordinate) {
	let _tiles = [...tiles];
	for (let i = 0; i < _tiles.length; i++) {
		let _size = size;
		for (let j = _tiles[i].length - 1; j >= 0; j--) {
			_tiles[i][j][coordinate] = _size;
			--_size;
		}
	}

	return _tiles;
}

export function increaseFindSameBlocksAndMerge(tiles) {
	let _tiles = [...tiles];
	for (let i = 0; i < _tiles.length; i++) {
		for (let j = 0; j < _tiles[i].length - 1; j++) {
			if (_tiles[i][j].value === _tiles[i][j + 1].value) {
				_tiles[i][j].value *= 2;
				_tiles[i].splice(j + 1, 1);
				break;
			}
		}
	}

	return _tiles;
}
