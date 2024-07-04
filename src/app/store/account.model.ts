// account.model.ts
export interface Account {
    id:number;
    username: string;
    IBAN: string;
    Name: string;
    age: string;
    beneficiaryType: string;
    balance?: number;  // If this field is optional or not returned by the API
  }
  