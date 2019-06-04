import { $playground } from '../stores/playground';
import { $gameStatus } from '../stores/gameStatus';

beforeEach(() => ($gameStatus.setState(''), $playground.setState(null)));
