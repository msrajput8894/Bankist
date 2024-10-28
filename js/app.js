// app.js
import { accounts, addNewAccount } from '../data/data.js';
import { formatDate } from '../helpers/date.js';
import {
  capitalizeFirstAndLastName,
  capitalizeFirstName,
} from '../helpers/helperfunctions.js';
import { sendCreditMail, sendDebitMail } from './email.js';
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

// Timer function
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

// Function to display date
function displayDate(account) {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    account.locale,
    options
  ).format(now);
}

// Function to clear input fields
function clearInputFields(...inputs) {
  inputs.forEach(input => (input.value = ''));
}

// Function to handle login

function handleLogin(e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${capitalizeFirstName(
      currentAccount.owner
    )}`;
    containerApp.style.opacity = 100;

    displayDate(currentAccount);
    clearInputFields(inputLoginUsername, inputLoginPin);
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  } else {
    showAlert(`Account doesn't exist!! Please validate the credential..`);
    clearInputFields(inputLoginUsername, inputLoginPin);
  }
}

// Function to handle transfer
function handleTransfer(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  clearInputFields(inputTransferAmount, inputTransferTo);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Update transaction amount and date into Current and Receiver account
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Send Debit Mail
    sendDebitMail(
      capitalizeFirstName(currentAccount.owner),
      currentAccount.email,
      currentAccount.accountNumber.slice(-4),
      formatDate(currentAccount.movementsDates.slice(-1), 'dd-mm-yyyy hh:MM'),
      Math.abs(currentAccount.movements.slice(-1)),
      capitalizeFirstAndLastName(receiverAcc.owner),
      receiverAcc.accountNumber.slice(-4)
    );

    // Send Credit Mail
    sendCreditMail(
      capitalizeFirstAndLastName(currentAccount.owner),
      receiverAcc.email,
      currentAccount.accountNumber.slice(-4),
      formatDate(currentAccount.movementsDates.slice(-1), 'dd-mm-yyyy hh:MM'),
      Math.abs(currentAccount.movements.slice(-1)),
      capitalizeFirstName(receiverAcc.owner),
      receiverAcc.accountNumber.slice(-4)
    );

    // Update UI
    updateUI(currentAccount);

    // Render notification
    showNotification(
      `${amount} has been transferred from your account to ${receiverAcc.owner}'s account`
    );

    // Reset the timer
    clearInterval(timer);
    timer = startLogOutTimer();
  } else if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance < amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    showAlert('Your account balance is insufficient to make this transaction!');
  } else if (!receiverAcc) {
    showAlert('Account does not exist!');
  } else {
    alert('Invalid Transaction!');
  }
}

// Function to handle loan request
function handleLoanRequest(e) {
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
}

// Function to sort movements
function handleSortMovements(e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
}

// Function to handle logout
function handleLogout(e) {
  e.preventDefault();
  console.log('successfully logged out');
  localStorage.setItem('accounts', JSON.stringify(accounts));
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Login to get started';
}

// Function to navigate back to home
function navigateToHome() {
  console.log('back to home');
  window.location.href = 'index.html';
}

// Function to show notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.remove('hidden');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
}

// Function to show alert
function showAlert(message) {
  const notification = document.getElementById('alert');
  notification.textContent = message;
  notification.classList.remove('hidden');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
}

// Event listeners
btnLogin.addEventListener('click', handleLogin);
btnTransfer.addEventListener('click', handleTransfer);
btnLoan.addEventListener('click', handleLoanRequest);
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
  clearInputFields(inputCloseUsername, inputClosePin);
});
btnSort.addEventListener('click', handleSortMovements);
logoutBtn.addEventListener('click', handleLogout);
document
  .querySelector('.back-to-home')
  .addEventListener('click', navigateToHome);
