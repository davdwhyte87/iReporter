function authCheckUser() {
    const token = localStorage.getItem('token');
    if (!token) {
       return false;
    } else {
      return true;  
    }
}