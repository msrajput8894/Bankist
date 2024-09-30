// const account1 = {
//   owner: 'Mahendrasing Rajput',
//   movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,

//   movementsDates: [
//     '2023-11-18T21:31:17.178Z',
//     '2023-12-23T07:42:02.383Z',
//     '2024-01-28T09:15:04.904Z',
//     '2024-04-01T10:17:24.185Z',
//     '2024-05-08T14:11:59.604Z',
//     '2024-05-27T17:01:17.194Z',
//     '2024-09-04T23:36:17.929Z',
//     '2024-09-06T10:51:36.790Z',
//   ],
//   currency: 'INR',
//   locale: 'en-IN', // de-DE
// };

// const account2 = {
//   owner: 'Ashwini Rajput',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,

//   movementsDates: [
//     '2023-11-01T13:15:33.035Z',
//     '2023-11-30T09:48:16.867Z',
//     '2023-12-25T06:04:23.907Z',
//     '2024-01-25T14:18:46.235Z',
//     '2024-02-05T16:33:06.386Z',
//     '2024-04-10T14:43:26.374Z',
//     '2024-09-03T18:49:59.371Z',
//     '2024-09-06T12:01:20.894Z',
//   ],
//   currency: 'USD',
//   locale: 'en-US',
// };

// // data.js
// export const accounts = [account1, account2];

// export function addNewAccount(firstName, lastName) {
//   // Determine the next account number
//   let accountNumber = 1;
//   while (accounts.some(acc => acc.owner === `account${accountNumber}`)) {
//     accountNumber++;
//   }

//   const newAccount = {
//     owner: `${firstName} ${lastName}`,
//     movements: [5000],
//     interestRate: 1.2, // Default interest rate
//     pin: pin,
//     movementsDates: [new Date().toISOString()],
//     currency: 'INR',
//     locale: 'en-IN',
//   };

//   // Dynamically assign the account number
//   accounts[`account${accountNumber}`] = newAccount;
// }

// data.js
export const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

export function addNewAccount(firstName, lastName, pin) {
  const newAccount = {
    owner: `${firstName} ${lastName}`,
    movements: [5000],
    interestRate: 1.2, // Default interest rate
    pin: pin,
    movementsDates: [new Date().toISOString()],
    currency: 'INR',
    locale: 'en-IN',
  };

  // Add the new account to the accounts array
  accounts.push(newAccount);

  // Update localStorage
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

console.log(accounts);
