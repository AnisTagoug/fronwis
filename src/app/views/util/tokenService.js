
import jwt_decode from 'jwt-decode';

class TokenService {
  constructor() {
    this.jwt = null;
    this.user = null;
    this.roles = [];
  }

  parseJWT() {
    if (this.jwt) {
      const decoded = jwt_decode(this.jwt);
      this.user = decoded.obj;
      this.roles = decoded.roles;
    }
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  isAuthenticated() {
    return this.roles && (this.isAdmin() || this.isUser());
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }

  saveToken(jwt) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  removeToken() {
    localStorage.removeItem('token');
    this.jwt = null;
    this.user = null;
    this.roles = [];
  }
}

export default new TokenService();
