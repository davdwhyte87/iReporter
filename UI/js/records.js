const url = "https://ireporterx.herokuapp.com/api/v1/red-flags";

function getData() {
  console.log('fetching..');
  fetch(url, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
  }).then(res => res.json())
  .then(response => {
    console.log(response);
  });
}
