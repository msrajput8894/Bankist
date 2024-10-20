// data.js
const generatedNumbers = new Set();

export class Account {
  constructor(firstName, lastName, pin) {
    this.owner = `${firstName} ${lastName}`;
    this.movements = [1000];
    this.interestRate = 1.2; // Default interest rate
    this.pin = pin;
    this.movementsDates = [new Date().toISOString()];
    this.currency = 'INR';
    this.locale = 'en-IN';
    this.isAdmin = false;
    this.username = this.createUsername();
    this.accountNumber = this.generateAccNum();
  }

  createUsername() {
    return `${this.owner.toLowerCase().split(' ').join('_')}@bankist.com`;
  }

  generateAccNum() {
    let uniqueNumber;
    do {
      uniqueNumber = Math.floor(Math.random() * 900000000000) + 100000000000;
    } while (generatedNumbers.has(uniqueNumber));
    generatedNumbers.add(uniqueNumber);
    return uniqueNumber.toString();
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
}

export function addNewAdminAccount(firstName, lastName, pin) {
  const newAccount = new AdminAccount(firstName, lastName, pin);
  accounts.push(newAccount);
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

console.log(accounts);
