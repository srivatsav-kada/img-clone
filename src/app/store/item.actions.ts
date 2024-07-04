// src/app/store/item.actions.ts
import { createAction, props } from '@ngrx/store';
import { Item } from '../models/item.model';


export const addItem = createAction(
  '[Item] Add Item',
  props<{ item: Item }>()
);

export const removeItem = createAction(
  '[Item] Remove Item',
  props<{ id: number }>()
);
