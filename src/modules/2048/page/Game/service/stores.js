import { gameDomain } from './domain';
import { mountEvent, newGameEvent, moveEvent } from './events';

export const $playground = gameDomain.store([]);
export const $score = gameDomain.store({ score: 0, bestScore: 0 });

$playground
	.on(
		mountEvent.map(({ playground, count, width, height }) =>
			playground.length ? playground : generation(count, width, height)
		),
		(_, payload) => payload
	)

	.on(
		newGameEvent.map(({ count, width, height }) => generation(count, width, height)),
		(_, payload) => payload
	)

	.on(moveEvent, (state, payload) => {
		let newState = [...state]
		if(payload === 37) {
			for (let i = 0; i < state.length; i++) {
				for (let j = 0; j < state[i].length; j++) {
					if(newState[i][j]) {
						for(let k = 0; k < j; k++) {
							if(!newState[i][k]) {
								newState[i][k] = newState[i][j]
								newState[i][j] = 0
							} else if(newState[i][k] == newState[i][j]) newState[i][k] += newState[i][j], newState[i][j] = 0
						}
					}
				}
			}
		}
	
		if(payload === 39) {
			for (let i = 0; i < state.length; i++) {
				for (let j = state[i].length-1; j > 0; j--) {
					if(newState[i][j]) {
						for(let k = state[i].length-1; k > j; k--) {
							if(!newState[i][k]) {
								newState[i][k] = newState[i][j]
								newState[i][j] = 0
							} else if(newState[i][k] == newState[i][j]) newState[i][k] += newState[i][j], newState[i][j] = 0
						}
					}
				}
			}
		}
	
		if(payload === 38) {
			for (let i = 0; i < state.length; i++) {
				for (let j = 0; j < state[i].length; j++) {
					if(newState[i][j]) {
						for(let k = 0; k < i; k++) {
							if(!newState[k][j]) {
								newState[k][j] = newState[i][j]
								newState[i][j] = 0
							} else if(newState[k][j] == newState[i][j]) newState[k][j] += newState[i][j], newState[i][j] = 0
						}
					}
				}
			}
		}
		
		if(payload === 40) {
			for (let i = 0; i < state.length; i++) {
				for (let j = 0; j < state[i].length; j++) {
					if(newState[i][j]) {
						for(let k = i+1; k < state.length; k++)
							if(!newState[k][j]) {
								newState[k][j] = newState[i][j]
								newState[i][j] = 0
							} else if(newState[k][j] == newState[i][j]) newState[k][j] += newState[i][j], newState[i][j] = 0
					}
				}
			}
		}
	
		return newState
	})

export const random = (count, width, height) => {
	let output = [];

	for (let i = 0; i < count; i++) {
		let yСoordinate = Math.floor(Math.random() * height);
		let xСoordinate = Math.floor(Math.random() * width);

		output.push([xСoordinate, yСoordinate]);
	}

	return output;
};

export const generation = (count, width, height) => {
	let result = [];
	let activeBlocks = [];

	for (let i = 0; i < count; i++) {
		let yСoordinate = Math.floor(Math.random() * height);
		let xСoordinate = Math.floor(Math.random() * width);

		activeBlocks.push([xСoordinate, yСoordinate]);
	}

	for (let i = 0; i < height; i++) {
		result.push([]);
		for (let j = 0; j < width; j++) {
			result[i].push(0);
			for (let k = 0; k < activeBlocks.length; k++) {
				if (activeBlocks[k][1] === i && activeBlocks[k][0] === j) result[i][j] = 2;
			}
		}
	}

	return result;
};

export const moving = (oldState, moveKey) => {
	let newState = [...oldState]
	if(moveKey === 37) {
		for (let i = 0; i < oldState.length; i++) {
			for (let j = 0; j < oldState[i].length; j++) {
				if(newState[i][j]) {
					for(let k = 0; k < j; k++) {
						if(!newState[i][k]) {
							newState[i][k] = newState[i][j]
							newState[i][j] = 0
						} else if(newState[i][k] == newState[i][j]) newState[i][k] += newState[i][j], newState[i][j] = 0
					}
				}
			}
		}
	}

	// [[2,0,0,0], 
	// 	[8,0,0,0], 
	// 	[0,8,8,8]]

	if(moveKey === 39) {
		for (let i = 0; i < oldState.length; i++) {
			for (let j = oldState[i].length-1; j > 0 ; j--) {
				console.log(i, j)
				if(newState[i][j-1]) {
					if(!newState[i][j]){
						newState[i][j] = newState[i][j-1]
						newState[i][j-1] = 0
					}
					if(newState[i][j] === newState[i][j-1]){
						newState[i][j] += newState[i][j-1], newState[i][j-1] = 0
					}
				}
			}
		}
	}

	// if(moveKey === 38) {
	// 	for (let i = oldState.length-1; i > 0; i++) {
	// 		for (let j = oldState[i].length-1; j > 0; j++) {
	// 			if(newState[i][j]) {
	// 				if(!newState[i-1][j]){
	// 					newState[i-1][j] = newState[i][j]
	// 					newState[i][j] = 0
	// 				}
	// 				if(newState[i-1][j] === newState[i][j]){
	// 					newState[i-1][j] += newState[i][j], newState[i][j] = 0
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	if(moveKey === 40) {
		for (let i = 0; i < oldState.length-1; i++) {
			for (let j = 0; j < oldState[i].length; j++) {
				if(newState[i][j]) {
					if(!newState[i+1][j]){
						newState[i+1][j] = newState[i][j]
						newState[i][j] = 0
					}
					if(newState[i+1][j] === newState[i][j]){
						newState[i+1][j] += newState[i][j], newState[i][j] = 0
					}
				}
			}
		}
	}

	return newState
}
