import { $savedGames } from '../services/store';

export const mockData = [
	{
		move: 5,
		score: 500,
		playground: [[0, 8, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
	},
	{
		move: 2,
		score: 100,
		playground: [[0, 8, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
	},
	{
		move: 3,
		score: 200,
		playground: [[0, 8, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
	},
	{
		move: 10,
		score: 1500,
		playground: [[0, 8, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
	}
];

// beforeEach(() => $savedGames.setState(mockData));
