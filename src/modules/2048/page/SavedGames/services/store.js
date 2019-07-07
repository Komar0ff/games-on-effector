import {createStore} from 'effector'
import {modalEvent} from './events'

export const $savedGames = createStore([])
  .on(modalEvent, (store, payload) => payload === 'yes' ? [] : store)

export const $modal = createStore(false).on(modalEvent, store => !store)
