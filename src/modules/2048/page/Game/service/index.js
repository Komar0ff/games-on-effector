import {createDomain} from 'effector'

//domain
export const gameDomain = createDomain('game page domain')

export const newGameEvent = gameDomain.event('new game event')
export const revertGameEvent = gameDomain.event('revert game event')
export const savedGameEvent = gameDomain.event('saved game event')
export const moveEvent = gameDomain.event('move on playground')

export const playgroundStore = gameDomain.store([])
export const scoreStore = gameDomain.store({score: 0, bestScore: 0})

// export const buttonClick = 
//   newGameEvent.

