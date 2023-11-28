import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import MainNavigation from '../components/Layout/MainNavigation';
import { getTokenDuration } from '../util/auth';

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) return;

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration); // 백엔드에서 토큰 만료가  1시간 설정되있으니까
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet/>
      </main>
    </>
  )
}
export default RootLayout;