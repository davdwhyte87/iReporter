
function setEdit(e){
  const elementClicked = e.target;
  const currentId = elementClicked.getAttribute('data');
  localStorage.setItem('currentId', currentId);
  window.location = 'single-record.html';
}


function deleteRecord(e){
  const elementClicked = e.target;
  const currentId = elementClicked.getAttribute('data');
  const recordsContainer = document.getElementById('records');
  recordsContainer.innerHTML = `<div class="container-center">Deleting.....</div>`;
  const deleteUrl = "https://ireporterx.herokuapp.com/api/v1/red-flags/"+ currentId
  console.log('deleting');
  fetch(deleteUrl, {
    method: "DELET",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
  }).then(res => res.json())
  .then(response => {
    // getData();
  })
  .catch((error) => {
    console.log(error);
  });
}
