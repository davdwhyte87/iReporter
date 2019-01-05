const formData = document.querySelector('form');
let url = "https://ireporterx.herokuapp.com/api/v1";
if (!authCheckUser()) {
    window.location = 'index.html';
}
function create(event) {
    event.preventDefault();
    const createButton = document.getElementById('create_btn');
    createButton.disabled = true;
    createButton.innerHTML = 'loading....';
    const geolocationField = document.getElementById('geolocation-display');
    const data= {
        title: formData.title.value,
        comment: formData.comment.value,
        type: formData.type.value,
        location: geolocationField.innerText
    };
    data.comment = tinymce.get('mytextarea').getContent();
    if( data.type === '') {
        flashMessage('error', 'A record type is needed');
        createButton.disabled = false;
        createButton.innerHTML = 'Create <i class="fa fa-fw fa-plus-square"></i>';
        return;
    }
    if (data.type === 'red-flag') {
        url = 'https://ireporterx.herokuapp.com/api/v1/red-flags';
    }
    if (data.type === 'intervention') {
        url = 'https://ireporterx.herokuapp.com/api/v1/interventions';
    }
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          },
          body: JSON.stringify(data),
    }).then(res => res.json())
    .then(response => {
        createButton.disabled = false;
        createButton.innerHTML = 'Create <i class="fa fa-fw fa-plus-square"></i>';
        // display success or error messages
        if (response.status === 400) {
            if (typeof response.error === 'string' || response.error instanceof String) {
                flashMessage('error', response.error);  
            } else {
                flashMessage('errorlist', 'An error occured', response.error);
            }
        } else if (response.status === 200) {
            flashMessage('success', response.data[0].message);
        }
        if (response.status === 401) {
            flashMessage('error', 'An error occured');
            logout();
        }
    })
    .catch((error) => {
        console.log(error);
        flashMessage('error', 'An error occured');
        createButton.disabled = false;
        createButton.innerHTML = 'Create <i class="fa fa-fw fa-plus-square"></i>';
    });
}

formData.addEventListener('submit', create);