import { actionTypes } from '../constants';

const pressKey = vector => ({
  type: actionTypes.PRESS_KEY,
  vector,
});

export default { pressKey };
