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


