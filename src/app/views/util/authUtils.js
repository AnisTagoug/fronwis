import jwt_decode from 'jwt-decode';

const decodeToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    // Handle invalid or expired token
    console.error('Error decoding token:', error);
    return null;
  }
};

export default decodeToken;
