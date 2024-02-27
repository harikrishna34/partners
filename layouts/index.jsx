import { useEffect, useContext } from 'react';
import { AppShell } from '@mantine/core';
import { useRouter } from 'next/router';

import CustomHeader from '@/components/CustomHeader';
import CustomFooter from '@/components/CustomFooter';

import { AuthContext } from '@/context/Auth';
const Layout = ({ children, noFooter }) => {
  const router = useRouter();
  const { next } = router.query;
  const { user, loading, isApproved } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user && user.isLogin) {
      if (isApproved) {
        router.replace(next ? decodeURIComponent(next) : '/dashboard');
      } else {
        router.replace(next ? decodeURIComponent(next) : '/partner-profile');
      }
    }
  }, [loading, user, router, next, isApproved]);

  return (
    <AppShell
      footer={noFooter ? null : <CustomFooter />}
      header={<CustomHeader />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
