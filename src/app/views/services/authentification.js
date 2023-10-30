import axios from 'axios';

class AuthenticationService {
  jwt = '';
  username = '';
  roles = [];

  onlog(data) {
    return axios.post("http://localhost:8093/login", data, { withCredentials: true });
  }

  saveToken(jwt) {
    localStorage.setItem("token", jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  registerUser(userForm) {
    const url = 'http://localhost:8093/register';
    return axios.post(url, userForm);
  }

  parseJWT() {
    try {
      const parts = this.jwt.split('.');
      const decoded = JSON.parse(atob(parts[1]));
      this.username = decoded.obj;
      this.roles = decoded.roles;
    } catch (error) {
      console.error('Failed to parse JWT:', error);
    }
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  isAuthentificated() {
    return this.roles && (this.isAdmin() || this.isUser());
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }

  logout() {
    localStorage.removeItem("token");
    this.jwt = '';
    this.username = '';
    this.roles = [];
    // You might need to implement your own routing logic for React here
  }
}

export default AuthenticationService;
