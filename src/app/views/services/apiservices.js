import axios from 'axios';

class APIService {
  constructor(authService) {
    this.authService = authService;
  }

  getUser() {
    const headers = { 'authorization': 'Bearer ' + this.authService.jwt };
    return axios.get('http://localhost:8093/Users', { headers });
  }

  updateUser(username, user) {
    const headers = { 'authorization': 'Bearer ' + this.authService.jwt };
    return axios.put('http://localhost:8093/update/' + username, user, { headers });
  }

  addUser(user) {
    return axios.post('http://localhost:8093/register', user);
  }

  deleteUser(user) {
    const headers = { 'authorization': 'Bearer ' + this.authService.jwt };
    return axios.delete('http://localhost:8093/delete/' + user, { headers });
  }

  userDetails(username) {
    const headers = { 'authorization': 'Bearer ' + this.authService.jwt };
    return axios.get('http://localhost:8093/User/' + username, { headers });
  }

  forgotPassword(username) {
    const url = 'http://localhost:8093/forgot-password';
    const params = { username: username };
    return axios.post(url, null, { params });
  }

  updatePassword(username, currentPassword, newPassword, confirmedPassword) {
    const url = `http://localhost:8093/update-password/${username}`;
    const params = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmedPassword: confirmedPassword
    };

    return axios.put(url, null, { params });
  }
}

export default APIService;
