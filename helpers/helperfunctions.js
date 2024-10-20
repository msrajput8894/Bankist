import { accounts } from '../data/data.js';
export function isDuplicateAccount(email) {
  return accounts.some(account => account.email === email);
}

export function capitalizeFirstAndLastName(string) {
  if (!string) return string; // Handle empty string or null
  const [firstName, lastName] = string.split(' ');
  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const capitalizedLastName = lastName
    ? lastName.charAt(0).toUpperCase() + lastName.slice(1)
    : '';
  return `${capitalizedFirstName} ${capitalizedLastName}`.trim();
}



export function capitalizeFirstName(string) {
  if (!string) return string; // Handle empty string or null
  const firstName = string.split(' ')[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}
