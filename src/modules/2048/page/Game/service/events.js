import {gameDomain} from './domain'

export const mountEvent = gameDomain.event('mount event');
export const newGameEvent = gameDomain.event('new game event');
export const revertGameEvent = gameDomain.event('revert game event');
export const savedGameEvent = gameDomain.event('saved game event');
export const moveEvent = gameDomain.event('move on playground');