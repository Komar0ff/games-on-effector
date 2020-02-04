import { createApi } from 'effector';
import { gameDomain } from '../../domain';

const $status = gameDomain.store('');
export const statusApi = createApi($status, {
	start: () => 'IN_PROGRESS',
	lose: () => 'LOSE',
	win: () => 'WIN'
});
