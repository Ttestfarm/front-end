import { redirect } from 'react-router-dom';

export function action() {
  localStorage.removeItem('expiration');
  // setUserInfo('');
  // setToken('');
  return redirect('/');
}
