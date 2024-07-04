// src/app/models/item.model.ts
export interface Item {
    id: number;
    name: string;
  }
  
  export interface AppState {
    items: Item[];
  }
  