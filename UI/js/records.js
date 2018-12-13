const url = "https://ireporterx.herokuapp.com/api/v1/red-flags";

let dataHtml = '';
const user = JSON.parse(localStorage.getItem('user'));

function setEdit(e){
  const elementClicked = e.target;
  const currentId = elementClicked.getAttribute('data');
  localStorage.setItem('currentId', currentId);
  window.location = 'single-record.html';
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
  const recordsContainer = document.getElementById('records');
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
    getData();
  })
  .catch((error) => {
    console.log(error);
    const recordsContainer = document.getElementById('records');
    recordsContainer.innerHTML = `<div class="container-center" style='color:red'>Error. You may reload..</div>`;
  });
}


function getData() {
  console.log('fetching..');
  const urlInterventions = "https://ireporterx.herokuapp.com/api/v1/interventions/"
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
      const recordsContainer = document.getElementById('records');
      let i = 0;
      const data = response.data;
      for (i; i < data.length; i++) {
        const currentData = data[i];
        dataHtml = dataHtml+ `
        <div class="card col-3">
        <p class="record-status">Status: ${currentData.status} ${user.isAdmin?'<a href=""><i class="fa fa-fw fa-edit"></i></a>':''}</p> 
        ${ currentData.image?' <img class="record-image" src="${currentData.image}"/>':''}
        <a href="single-record.html" class="record-title" onClick="setViewSingle(event)" data="${currentData.id}">${currentData.title}</a>
        <div class="record-actions">
            <a href="#" class="rc"><i  onClick="setEdit(event)" data="${currentData.id}" class="fa fa-fw fa-edit "></i></a>
            ${(user.id === currentData.createdBy)?
              `<a href="#" class="rc"><i onClick="deleteRecord(event)"  data="${currentData.id}"  class="fa fa-fw fa-trash"></i></a>`
              :''}
        </div>
       </div>
        `;

      }
      recordsContainer.innerHTML = dataHtml;
    }
  })
  .catch((erro) => {
    const recordsContainer = document.getElementById('records');
    recordsContainer.innerHTML = `<div class="container-center" style='color:red'>Error. You may reload..</div>`;
  });

  fetch(urlInterventions, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
  }).then(res => res.json())
  .then(response => {
    console.log(response);
    if (response.status === 200) {
      const recordsContainer = document.getElementById('records');
      let i = 0;
      const data = response.data;
      for (i; i < data.length; i++) {
        const currentData = data[i];
        dataHtml = dataHtml+ `
        <div class="card col-3">
        <p class="record-status">Status: ${currentData.status} ${user.isAdmin?'<a href=""><i class="fa fa-fw fa-edit"></i></a>':''}</p> 
        ${ currentData.image?' <img class="record-image" src="${currentData.image}"/>':''}
        <a href="single-record.html" class="record-title" onClick="setViewSingle(event)" data="${currentData.id}">${currentData.title}</a>
        <div class="record-actions">
            <a href="#" class="rc"><i  onClick="setEdit(event)" data="${currentData.id}" class="fa fa-fw fa-edit "></i></a>
            ${(user.id === currentData.createdBy)?
            `<a href="#" class="rc"><i onClick="deleteRecord(event)"  data="${currentData.id}"  class="fa fa-fw fa-trash"></i></a>`
            :''}
        </div>
       </div>
        `;

      }
      recordsContainer.innerHTML = dataHtml;
    }
  })
  .catch((erro) => {
    console.log(erro);
    const recordsContainer = document.getElementById('records');
    recordsContainer.innerHTML = `<div class="container-center" style='color:red'>Error. You may reload..</div>`;
  });
}
