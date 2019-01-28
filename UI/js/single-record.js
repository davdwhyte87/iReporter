
let dataHtml = '';
const user = JSON.parse(localStorage.getItem('user'));

function setEdit(e){
  const elementClicked = e.target;
  const currentId = elementClicked.getAttribute('data');
  localStorage.setItem('currentId', currentId);
  window.location = 'edit-record.html';
}

function setViewSingle(e) {
  const elementClicked = e.target;
  const currentId = elementClicked.getAttribute('data');
  localStorage.setItem('currentId', currentId);
  console.log(currentId);
  window.location = 'single-record.html'; 
}


function deleteRecord(e){
  const elementClicked = e.target;
  const currentId = elementClicked.getAttribute('data');
  const recordsContainer = document.getElementById('record');
  recordsContainer.innerHTML = `<div class="container-center">Deleting.....</div>`;
  const deleteUrl = 'https://ireporterx.herokuapp.com/api/v1/red-flags/' + currentId;
  console.log(deleteUrl);
  console.log('deleting');
  fetch(deleteUrl, {
    method: "DELETE",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
  }).then(res => res.json())
  .then(response => {
    console.log(response);
    window.location = 'records.html';
  })
  .catch((error) => {
    console.log(error);
    const recordsContainer = document.getElementById('records');
    recordsContainer.innerHTML = `<div class="container-center" style='color:red'>Error. You may reload..</div>`;
  });
}


function getData() {
  const recordsContainer = document.getElementById('record');
  recordsContainer.innerHTML = `<div class="container-center">Loading...</div>`;
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
      const data = response.data;
      for (i; i < data.length; i++) {
        const currentData = data[i];
        dataHtml = dataHtml+ recordTemplate(currentData);

      }
      recordsContainer.innerHTML = dataHtml;
    }
  })
  .catch((erro) => {
    const recordsContainer = document.getElementById('records');
    recordsContainer.innerHTML = `<div class="container-center" style='color:red'>Error. You may reload..</div>`;
  });

  
}



function changeStatus(e) {
  e.preventDefault();
  const elementClicked = e.target;
  const newStatus = elementClicked.options[elementClicked.selectedIndex].value;
  console.log(newStatus);
  const currentId = elementClicked.getAttribute('data');
  const recordType = elementClicked.getAttribute('type');
  console.log(recordType);
  elementClicked.setAttribute('disabled', 'true');
  let url = "https://ireporterx.herokuapp.com/api/v1/red-flags/"+currentId+'/status';
  if (recordType == 'intervention') {
    url = "https://ireporterx.herokuapp.com/api/v1/interventions/"+currentId+'/status';
  }
  
  const data= {
    status: newStatus
};
  fetch(url, {
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(data),
  }).then(res => res.json())
  .then(response => {
    elementClicked.removeAttribute('disabled', 'false');
    console.log(elementClicked);
    if (response.status === 400) {
      if (typeof response.error === 'string' || response.error instanceof String) {
          flashMessage('error', response.error);  
      } else {
          flashMessage('errorlist', 'Error updating location', response.error);
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
    elementClicked.setAttribute('disabled', 'false');
    console.log(error);
  });

}

function recordTemplate(currentData) {
  if(user.id == currentData.createdBy) {
    console.log(user.id);
  }
  return  `
  <div class="card">
  <p class="record-status">Status: ${currentData.status} ${user.isAdmin?'<a href="#"><i class="fa fa-fw fa-edit"></i></a>':''}</p> 
  ${ currentData.image?` <img class="record-image" src="${currentData.image}"/>`:''}
  <a href="#" class="record-title">${currentData.title}</a>
  ${currentData.comment}
  <div class="record-actions">
  ${(user.id == currentData.createdBy)?
    `<a href="#" class="rc"><i  onClick="setEdit(event)" data="${currentData.id}" class="fa fa-fw fa-edit "></i></a>`
    :''}
  ${(user.id == currentData.createdBy)?
      `<a href="#" class="rc"><i onClick="deleteRecord(event)"  data="${currentData.id}"  class="fa fa-fw fa-trash"></i></a>`
    :''}
  ${(user.isAdmin == true)?
    `
    <select class=" input" onchange="changeStatus(event)"  data="${currentData.id}" type=${currentData.type} >
      <option value="under-investigation" onClick="changeStatus(event)">Under-investigation</option>
      <option value="draft" selected onClick="changeStatus(event)">Draft</option>
      <option value="resolved" onClick="changeStatus(event)">Resolved</option>
      <option value="rejected" onClick="changeStatus(event)">Rejected</option>
    </select>
    `
  :''}
  </div>
 </div>
  `;
}

