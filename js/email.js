export async function sendWelcomeMail(name, username, email) {
  emailjs
    .send('service_1qvuval', 'template_wx0tziz', {
      to_name: name,
      user_id: username,
      email_id: 'bankist.support@bankist.com',
      user_email: email,
    })
    .then(alert('Email Sent!'));
}

export async function sendDebitMail(
  name,
  email,
  accNum,
  date,
  amount,
  recName,
  recAccNum
) {
  emailjs.send('service_1qvuval', 'template_9xfn5to', {
    to_name: name,
    account_num: accNum,
    date: date,
    amount: amount,
    support_number: '0123456789',
    support_email: 'bankist.support@bankist.com',
    user_email: email,
    receiver_name: recName,
    receiver_acc: recAccNum,
  });
}
