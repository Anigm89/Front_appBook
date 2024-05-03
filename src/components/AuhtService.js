import { auth } from '../fb.js';

export const isLoggedIn = () => {
  return auth.currentUser !== null;
};

export const getCurrentUser = () => {
  return auth.currentUser;
};