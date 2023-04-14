import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET; 

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('id_token');
    }
    return null;
  }

  login(idToken) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('id_token');
      window.location.assign('/');
    }
  }
  signToken(userData) {
    const token = jwt.sign({ data: userData }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }


}

const authService = new AuthService(); 

export default authService; 
