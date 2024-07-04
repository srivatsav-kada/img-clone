// src/app/store/item.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Item } from '../models/item.model';

export const selectItems = createFeatureSelector<Item[]>('items');

export const selectAllItems = createSelector(
  selectItems,
  (items) => items
);
