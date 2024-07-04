import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state.model';
import { addItem, removeItem } from '../../store/item.actions';
import { increment, decrement, reset } from '../../store/counter.actions';
import { selectAllItems } from '../../store/item.selectors';
import { selectCounter } from '../../counter.selectors';
import { Observable } from 'rxjs';
import { CustomValidators } from '../../store/validators';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  items$: Observable<any>;
  counter$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.items$ = this.store.select(selectAllItems);
    this.counter$ = this.store.select(selectCounter);
  }

  addItem() {
    const item = { id: Math.random(), name: 'Item ' + Math.random() };
    this.store.dispatch(addItem({ item }));
  }

  removeItem(id: number) {
    this.store.dispatch(removeItem({ id }));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}