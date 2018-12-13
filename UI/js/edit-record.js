const formData = document.querySelector('form');
let url = null;
if (!authCheckUser()) {
    window.location = 'index.html';
}
let recordData= null;

function getData() {
  console.log('fetching single...');
  const currentId = localStorage.getItem('currentId')
  const url = "https://ireporterx.herokuapp.com/api/v1/red-flags/"+ currentId
  fetch(url, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
  }).then(res => res.json())
  .then(response => {
    console.log(response);
    if (response.status === 200) {
      const recordsContainer = document.getElementById('record');
      let i = 0;
      const data = response.data[0];
      recordData = data;
      console.log(recordData.type);
      formData.title.value = data.title;
      formData.comment.value = data.comment;
      tinymce.activeEditor.setContent(data.comment);
    }
  })
  .catch((erro) => {
    console.log(erro);
    const recordsContainer = document.getElementById('record');
    recordsContainer.innerHTML = `<div class="container-center" style='color:red'>Error. You may reload..</div>`;
  });

  
}


function updateLocation(location) {
  const data= {
    location: location
};
if(recordData.type === 'red-flag'){
  url="https://ireporterx.herokuapp.com/api/v1/red-flags/"+currentId+'/location';
} else {
  url="https://ireporterx.herokuapp.com/api/v1/interventions/"+currentId+'/location';
}
const createButton = document.getElementById('create_btn');
createButton.disabled = true;
createButton.innerHTML = 'loading....';
fetch(url, {
  method: "PATCH",
  headers: {
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    },
    body: JSON.stringify(data),
}).then(res => res.json())
.then(response => {
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
});
}
const currentId = localStorage.getItem('currentId');
function update(event) {
    event.preventDefault();
    const createButton = document.getElementById('create_btn');
    createButton.disabled = true;
    createButton.innerHTML = 'loading....';
    const geolocationField = document.getElementById('geolocation-display');
    const data= {
        title: formData.title.value,
        comment: formData.comment.value,
        location: geolocationField.innerText
    };

    if(data.location !== '') {
      updateLocation(data.location);
    }
    data.comment = tinymce.get('mytextarea').getContent();
    console.log(recordData)
    if(recordData.type === 'red-flag'){
      url="https://ireporterx.herokuapp.com/api/v1/red-flags/"+currentId+'/comment';
    } else {
      url="https://ireporterx.herokuapp.com/api/v1/interventions/"+currentId+'/comment';
    }
    fetch(url, {
        method: "PATCH",
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

formData.addEventListener('submit', update);