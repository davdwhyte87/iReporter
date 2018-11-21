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