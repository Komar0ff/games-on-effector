import { createEvent } from 'effector';

export const mountEvent = createEvent();
export const alertEvent = createEvent('view alert event');
export const modalEvent = createEvent('open/close modal event');
export const removeCardEvent = createEvent('remove one card event');
