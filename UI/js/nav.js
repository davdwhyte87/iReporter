if (authCheckUser()){
  const user = JSON.parse(localStorage.getItem('user'));
  const navbarElement = document.getElementById('navbar');
  navbarElement.innerHTML = `
  <a href="#" onclick="toggleNav()" class="nav-mobile">☰ menu</a>
  <ul id="l-nav">
      <li><a class="active" href="index.html">Home</a></li>
      <li><a href="records.html">Records</a></li>
      <li><a href="create-record.html">Create report</a></li>
      <li><a href="profile.html">Profile</a></li>
  </ul>
  <ul id="r-nav">
      <li><a href="#"  onclick="logout()">Logout <i class="fa fa-fw fa-sign-out"></i> </a></li>
      <li><a href="#" class="nav-name">`+ user.firstname+ ' '+ user.lastname+` </a></li>
  </ul>`;
} else {
  const navbarElement = document.getElementById('navbar');
  navbarElement.innerHTML = `
  <a href="#" onclick="toggleNav()" class="nav-mobile">☰ menu</a>
  <ul id="l-nav">
      <li><a class="active" href="index.html">Home</a></li>
      <li><a href="sign-in.html">Signin</a></li>
      <li><a href="sign-up.html">Signup</a></li>
  </ul>
  <ul id="r-nav">
  </ul>`;
}