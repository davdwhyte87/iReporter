const formData = document.querySelector('form');
const url = "https://ireporterx.herokuapp.com/api/v1/auth/login";

function login(event) {
    event.preventDefault();
    const signinButton = document.getElementById('signin_btn');
    signinButton.disabled = true;
    signinButton.innerHTML = 'loading....';
    const data= {
        email: formData.email.value,
        password: formData.password.value,
    };

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    }).then(res => res.json())
    .then(response => {
        signinButton.disabled = false;
        signinButton.innerHTML = 'Signup <i class="fa fa-fw fa-edit"></i>';
        console.log(response);
        // display success or error messages
        if(response.status === 400){
            if (typeof response.error === 'string' || response.error instanceof String) {
                flashMessage('error', response.error);  
            } else {
                flashMessage('errorlist', 'An error occured', response.error);
            }
        } else if (response.status === 200) {
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

formData.addEventListener('submit', login);