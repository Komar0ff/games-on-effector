import { createApi } from 'effector';
import { gameDomain } from '../../domain';

export const $status = gameDomain.store('IN_PROGRESS');
export const statusApi = createApi($status, {
	start: () => 'IN_PROGRESS',
	lose: () => 'LOSE',
	win: () => 'WIN',
});
