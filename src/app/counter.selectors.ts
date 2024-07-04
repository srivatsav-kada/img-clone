// src/app/store/counter.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectCounter = createFeatureSelector<number>('counter');
