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

export function objectComparison(tiles, obj2) {
	return tiles.find((obj1) => JSON.stringify(obj1) === JSON.stringify(obj2));
}

export function tileGeneration(tiles, { width, height }) {
	let result = [];
	let tilesCoordinateOnly = tiles.map((v) => ({ x: v.x, y: v.y }));
	let _tiles = [...tiles];

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			!objectComparison(tilesCoordinateOnly, { x: i, y: j })
				? result.push({ x: i, y: j, value: 2 })
				: null;
		}
	}

	if (result.length) {
		let target = Math.floor(Math.random() * Math.floor(result.length));
		_tiles.push(result[target]);
	}

	return _tiles;
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
