import { createEvent } from 'effector';

export const widthEvent = createEvent('change playground width');
export const heightEvent = createEvent('change playground height');
export const playgroundUpdateEvent = createEvent('update playground');
