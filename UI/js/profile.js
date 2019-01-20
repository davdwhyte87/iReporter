const url = "https://ireporterx.herokuapp.com/api/v1/red-flags/me";
let dataHtml = '';
const user = JSON.parse(localStorage.getItem('user'));
let numberOfDraftRecords = 0;
let numberOfUnderInvestigationRecords = 0;
let numberOfResolvedRecords = 0;

function getRecords() {
  console.log('fetching..');
  const urlInterventions = "https://ireporterx.herokuapp.com/api/v1/interventions/me"
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
        dataHtml = dataHtml+ recordTemplate(currentData);
        if (currentData.status == 'draft') {
          numberOfDraftRecords++;
          document.getElementById('draftCount').innerHTML = numberOfDraftRecords;
        }
        if (currentData.status == 'under-investigation') {
          numberOfUnderInvestigationRecords++;
          document.getElementById('underInvestigationCount').innerHTML = numberOfUnderInvestigationRecords;
        }
        if (currentData.status == 'resolved') {
          numberOfResolvedRecords++;
          document.getElementById('resolvedCount').innerHTML = numberOfResolvedRecords;
        }
      }
      recordsContainer.innerHTML = dataHtml;
    } 
    if (response.status === 401) {
      logout();
    }
  })
  .catch((erro) => {
    console.log(erro);
    const recordsContainer = document.getElementById('records');
    recordsContainer.innerHTML = `<div class="container-center" style='color:red'>Error. You may reload..</div>`;
  });
}

function recordTemplate(currentData) {
  return `
  <div class="card col-3">
  <p class="record-status">Status: ${currentData.status} ${user.isAdmin?'<a href=""><i class="fa fa-fw fa-edit"></i></a>':''}</p> 
  ${ currentData.image?` <img class="record-image" src="${currentData.image}"/>`:''}
  <a href="single-record.html" class="record-title" onClick="setViewSingle(event)" data="${currentData.id}">${currentData.title}</a>
  <div class="record-actions">
  ${(user.id == currentData.createdBy)?
    `<a href="#" class="rc"><i  onClick="setEdit(event)" data="${currentData.id}" class="fa fa-fw fa-edit "></i></a>`
    :''}
      ${(user.id == currentData.createdBy)?
      `<a href="#" class="rc"><i onClick="deleteRecord(event)"  data="${currentData.id}"  class="fa fa-fw fa-trash"></i></a>`
      :''}
  </div>
 </div>
  `;
}

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
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
    const recordsContainer = document.getElementById('records');
    recordsContainer.innerHTML = `<div class="container-center" style='color:red'>Error. You may reload..</div>`;
  });
}

