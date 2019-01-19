const formData = document.querySelector('form');
//get user data from local storage
function getData() {
  console.log('fetching single...');
  const user = JSON.parse(localStorage.getItem('user'));
  
  console.log(user);
  if (user) {
    formData.firstname.value = user.firstname;
    formData.lastname.value = user.lastname;
    formData.email.value = user.email;
    formData.username.value = user.username;
    formData.phone.value = user.phoneNumber;
  } else {
    flashMessage('error', 'An error occured');
  }
}

function updateProfile (event) {
  event.preventDefault();
  console.log('updating....');
  const editButton = document.getElementById('edit_btn');
  editButton.disabled = true;
  editButton.innerHTML = 'Loading...';
  const data = {
    firstname : formData.firstname.value,
    lastname: formData.lastname.value,
    username: formData.username.value,
    phone: formData.phone.value
  };
  console.log(data);
  const url = "https://ireporterx.herokuapp.com/api/v1/auth/me";
  fetch(url, {
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(data),
}).then(res => res.json())
.then(response => {
  editButton.disabled = false;
  editButton.innerHTML = 'Edit <i class="fa fa-fw fa-edit"></i>';
  if (response.status === 200) {
    flashMessage('success', response.data[0].message);
  }
  if (response.status === 400) {
    flashMessage('error', response.error);
  }
  if (response.status === 401) {
    logout();
  }
})
.catch((error) => {
  editButton.disabled = false;
  editButton.innerHTML = 'Edit <i class="fa fa-fw fa-edit"></i>';
  flashMessage('error', 'An error occured');
  console.log(error);
});
}

formData.addEventListener('submit', updateProfile);
