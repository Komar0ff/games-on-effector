export const indexDecrease = (array, coordinate) => {
	let _array = [...array];

	_array = subsetFormation(_array, coordinate);
	findSameBlocksAndMerge(_array, coordinate);
	moveToFreeSpace(_array, coordinate);
	subsetIntegration(_array);

	return _array;

	/* array
      .subsetFormation(array, coordinate)
      .findSameBlocksAndMerge()
      .moveToFreeSpace()
      .subsetIntegration()
  */
};

export const findSameBlocksAndMerge = (array) => {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length - 1; j++) {
			if (array[i][j].value === array[i][j + 1].value) {
				array[i][j].value *= 2;
				array[i].splice(j + 1, 1);
				break;
			}
		}
	}

	return array;
};

export const moveToFreeSpace = (array, coordinate) => {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			array[i][j][coordinate] = j;
		}
	}

	console.log(array);
	return array;
};

export const subsetFormation = (array, coordinate) => {
	let subsets = [];
	let uniqueSecondCoordinate = new Set();
	const searchCoordinate = coordinate === 'x' ? 'y' : 'x';

	for (let i = 0; i < array.length; i++) {
		uniqueSecondCoordinate.add(array[i][searchCoordinate]);
	}

	for (let value of uniqueSecondCoordinate) {
		subsets.push(
			array
				.sort((a, b) => a[coordinate] - b[coordinate])
				.filter((subValue) => subValue[searchCoordinate] === value)
		);
	}

	console.log(subsets);
	return subsets;
};

export const subsetIntegration = (array) => {
	let newArray = [];

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			newArray.push(array[i][j]);
		}
	}

	return newArray;
};
