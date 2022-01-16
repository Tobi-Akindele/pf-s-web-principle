function validateForm() {
  let email = document.getElementById('email');
  let name = document.getElementById('name');
  let subject = document.getElementById('subject');
  let message = document.getElementById('message');

  alert(
    "Thank you for contacting me, I'll get back to you as soon as possible. \n\n You have entered the following details \n Email: " +
      email.value +
      '\n Name: ' +
      name.value +
      '\n Subject: ' +
      subject.value +
      '\n'
  );
}
