// app.js
import { accounts, addNewAccount } from '../data/data.js';
import {
  displayMovements,
  calcDisplayBalance,
  calcDisplaySummary,
  labelWelcome,
  containerApp,
  labelDate,
  labelTimer,
  updateUI,
} from './ui.js';

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const logoutBtn = document.querySelector('.btn--logout');

let currentAccount, timer;

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };

  let time = 5 * 60;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  } else {
    alert(
      'Account does not exist...🚫 Please check your credentials and try again!'
    );
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    showNotification(
      `${amount} has been transferred from your account to ${receiverAcc.owner}'s account`
    );
    clearInterval(timer);
    timer = startLogOutTimer();
  } else if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance < amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    showAlert(`Your account balance is insufficient to make this transaction!`);
  } else if (!receiverAcc) {
    showAlert(`Account does not exist!`);
  } else {
    alert('Invalid Transaction!');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      showNotification(
        `Your loan request is approved for the amount of ${amount}`
      );
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 5000);
  } else {
    showAlert('Invalid Request! please try again later.');
  }
  inputLoanAmount.value = '';
});

// Function to find account index by username
function findAccountIndex(username) {
  return accounts.findIndex(acc => acc.username === username);
}

// Function to close account
function closeAccount(index) {
  if (index !== -1) {
    const account = accounts[index];
    showNotification(`${account.owner} Your account has been closed!`);
    accounts.splice(index, 1);
    localStorage.setItem('accounts', JSON.stringify(accounts));
  } else {
    showAlert('User not found!');
  }
}

// Function to handle account close by user
function handleUserClose() {
  const index = findAccountIndex(currentAccount.username);
  closeAccount(index);
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Login to get started';
}

// Function to handle account close by admin
function handleAdminClose() {
  const userName = inputCloseUsername.value;
  const index = findAccountIndex(userName);
  closeAccount(index);
  showNotification(`Admin has deleted the account of ${userName}`);
}

// Main event listener
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const isValidUser =
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin;
  const isAdmin =
    currentAccount.username.includes('admin') &&
    Number(inputClosePin.value) === currentAccount.pin;

  if (isValidUser) {
    handleUserClose();
  } else if (isAdmin) {
    handleAdminClose();
  } else {
    showAlert('Invalid Credentials! Please provide the valid credentials.');
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

document.querySelector('.back-to-home').addEventListener('click', () => {
  console.log('back to home');
  window.location.href = 'index.html';
});

// Logout functionality:

logoutBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log('successfully logged out');
  localStorage.setItem('accounts', JSON.stringify(accounts));
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Login to get started';
});

// Generate Notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.remove('hidden');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
}

// Generate Alert

function showAlert(message) {
  const notification = document.getElementById('alert');
  notification.textContent = message;
  notification.classList.remove('hidden');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
}
