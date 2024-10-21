export async function sendWelcomeMail(name, username, email, accountNumber) {
  try {
    const response = await emailjs.send('service_1qvuval', 'template_wx0tziz', {
      to_name: name,
      user_id: username,
      email_id: 'bankist.support@bankist.com',
      user_email: email,
      user_accNum: accountNumber,
    });
    console.log('Email Sent:', response.status, response.text);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Propagate error to be caught in the form submission handler
  }
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
    sendOrRec_name: recName,
    sendOrRec_acc: recAccNum,
    trans_type: 'Debit',
    trans_action: 'from',
    from_to: 'To',
  });
}


export async function sendCreditMail(
  name,
  email,
  accNum,
  date,
  amount,
  recName,
  recAccNum
) {
  emailjs.send('service_1qvuval', 'template_9xfn5to', {
    to_name: recName,
    account_num: recAccNum,
    date: date,
    amount: amount,
    support_number: '0123456789',
    support_email: 'bankist.support@bankist.com',
    user_email: email,
    sendOrRec_name: name,
    sendOrRec_acc: accNum,
    trans_type: 'Credit',
    trans_action: 'to',
    from_to: 'From',
  });
}

