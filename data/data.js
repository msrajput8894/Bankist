// data.js
export class Account {
  constructor(firstName, lastName, pin) {
    this.owner = `${firstName} ${lastName}`;
    this.movements = [];
    this.interestRate = 1.2; // Default interest rate
    this.pin = pin;
    this.movementsDates = [new Date().toISOString()];
    this.currency = 'INR';
    this.locale = 'en-IN';
    this.isAdmin = false;
    this.username = this.createUsername();
  }

  createUsername() {
    return `${this.owner.toLowerCase().split(' ').join('_')}@bankist.com`;
  }
}

export const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

export function addNewAccount(firstName, lastName, pin) {
  const newAccount = new Account(firstName, lastName, pin);
  accounts.push(newAccount);
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

export class AdminAccount extends Account {
  constructor(firstName, lastName, pin) {
    super(firstName, lastName, pin);
    this.movements = [100000];
    this.isAdmin = true;
  }

  deleteAccount(username) {
    //
  }

  adjustBalance(username, newBalance) {
    // Implement balance adjustment logic...
  }
}

export function addNewAdminAccount(firstName, lastName, pin) {
  const newAccount = new AdminAccount(firstName, lastName, pin);
  accounts.push(newAccount);
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

console.log(accounts);
