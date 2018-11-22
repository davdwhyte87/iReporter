tinymce.init({
  selector: '#mytextarea',
  menubar:false
});
function openDialog(name){
    document.getElementById(name).click()
}

function previewImage(event) {
    console.log(event.files)
    if (event.files && event.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('img-preview').src=e.target.result;
      };
  
      reader.readAsDataURL(event.files[0]);
    }
  }

var geolocation_display = document.getElementById("geolocation-display");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        geolocation_display.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    geolocation_display.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}

function change_status(){
  var status_array=['Draft','Rejected','Under-investigation'];
  var status=document.getElementById("status");
  var current_status_id=status.getAttribute("data");
  var new_status_id=parseInt(current_status_id)+1
  if(new_status_id>status_array.length-1){
    new_status_id=0;
  }
  status.setAttribute("data",new_status_id);
  status.innerHTML=status_array[new_status_id];
  console.log(new_status_id);
}

function openModal(name){
  var modal = document.getElementById(name);
  modal.style.display="block";
  //close with window click
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}

function closeModal(name){
  var modal = document.getElementById(name);
  modal.style.display="none";
}