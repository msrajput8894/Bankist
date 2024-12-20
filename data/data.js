import { capitalizeFirstName } from '../helpers/helperfunctions.js';

// data.js
const generatedNumbers = new Set();

export class Account {
  constructor(firstName, lastName, email, pin) {
    this.owner = `${capitalizeFirstName(firstName)} ${capitalizeFirstName(
      lastName
    )}`;
    this.movements = [1000];
    this.interestRate = 1.2;
    this.email = email;
    this.pin = pin;
    this.movementsDates = [new Date().toISOString()];
    this.currency = 'INR';
    this.locale = 'en-IN';
    this.isAdmin = false;
    this.username = this.createUsername();
    this.accountNumber = this.generateAccNum();
  }

  createUsername() {
    return this.email;
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

export function addNewAccount(firstName, lastName, email, pin) {
  const newAccount = new Account(firstName, lastName, email, pin);
  accounts.push(newAccount);
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

export class AdminAccount extends Account {
  constructor(firstName, lastName, email, pin) {
    super(firstName, lastName, email, pin);
    this.movements = [100000];
    this.isAdmin = true;
  }
}

export function addNewAdminAccount(firstName, lastName, email, pin) {
  const newAccount = new AdminAccount(firstName, lastName, email, pin);
  accounts.push(newAccount);
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

console.log(accounts);
