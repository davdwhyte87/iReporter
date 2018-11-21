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