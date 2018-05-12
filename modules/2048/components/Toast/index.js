import { Toaster, Position } from '@blueprintjs/core';

const Toast = Toaster.create({
  position: Position.BOTTOM_RIGHT,
});
export default message => Toast.show({
  className: 'pt-intent-primary',
  message,
  timeout: 2500,
});
