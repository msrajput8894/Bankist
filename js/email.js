export function sendWelcomeMail(name, username, email) {
  emailjs
    .send('service_1qvuval', 'template_wx0tziz', {
      to_name: name,
      user_id: username,
      email_id: 'bankist.support@bankist.com',
      user_email: email,
    })
    .then(alert('Email Sent!'));
}


export function sendDebitMail(name, email, accnum, date, amount) {
  emailjs.send('service_1qvuval', 'template_9xfn5to', {
    to_name: name,
    account_num: accnum,
    date: date,
    amount: amount,
    support_number: '0123456789',
    support_email: 'bankist.support@bankist.com',
    user_email: email,
  });
}
