// src/app/store/counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialCounterState = 0;

const _counterReducer = createReducer(
  initialCounterState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => initialCounterState)
);

export function counterReducer(state: number | undefined, action: any) {
  return _counterReducer(state, action);
}
