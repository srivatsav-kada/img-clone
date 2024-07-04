// src/app/store/item.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem } from './item.actions';
import { Item } from '../models/item.model';

export const initialState: Item[] = [];

const _itemReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => [...state, item]),
  on(removeItem, (state, { id }) => state.filter(item => item.id !== id))
);

export function itemReducer(state: Item[] | undefined, action: any) {
  return _itemReducer(state, action);
}
