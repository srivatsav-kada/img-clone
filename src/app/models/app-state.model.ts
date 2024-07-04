
import { Item } from './item.model';
import { AuthState } from './auth.model';
import { BlockedAccountState } from '../store/blocked-account.reducer';

export interface AppState {
  items: Item[];
  counter: number;
  auth: AuthState;
  blockedAccount: BlockedAccountState; 
}
