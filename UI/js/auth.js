const formData = document.querySelector('form');
const url = "https://ireporterx.herokuapp.com/api/v1/auth/signup";

function signup(event) {
    event.preventDefault();
    const signupButton = document.getElementById('signup_btn');
    signupButton.disabled = true;
    signupButton.innerHTML = 'loading....';
    console.log(signupButton);
    const data= {
        firstname: formData.firstname.value,
        lastname: formData.lastname.value,
        othernames: formData.othernames.value,
        username: formData.username.value,
        email: formData.email.value,
        password: formData.password.value,
        phone: formData.phone.value
    };

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    }).then(res => res.json())
    .then(response => {
        signupButton.disabled = false;
        signupButton.innerHTML = 'Signup <i class="fa fa-fw fa-edit"></i>';
        console.log(response);
        // display success or error messages
        if(response.status === 400){
            if (typeof response.error === 'string' || response.error instanceof String) {
                flashMessage('error', response.error);  
            } else {
                flashMessage('errorlist', 'An error occured', response.error);
            }
        } else if (response.status === 201) {
            flashMessage('success', 'User successfully created');
            // store user token
            localStorage.setItem('token', response.data[0].token);
            localStorage.setItem('user', JSON.stringify(response.data[0].user));
            window.location = 'index.html';
        }
    })
    .catch((error) => {
        flashMessage('error', 'An error occured');
        signupButton.disabled = false;
        signupButton.innerHTML = 'Signup <i class="fa fa-fw fa-edit"></i>';
    });
}

formData.addEventListener('submit', signup);