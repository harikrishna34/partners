import { useEffect, useContext } from 'react';
import { AppShell } from '@mantine/core';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/Auth';
import CustomHeader from '@/components/CustomHeader';
import CustomFooter from '@/components/CustomFooter';
import * as Rest from '@/data/restapi';

const AdminLayout = ({ children, noFooter }) => {
  const router = useRouter();
  const { next } = router.query;
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user && !loading)
      router.replace(next ? decodeURIComponent(next) : '/admin/dashboard');
  }, [user, router, loading, next]);

  return (
    <AppShell footer={!noFooter && <CustomFooter />} header={<CustomHeader />}>
      {children}
    </AppShell>
  );
};

export default AdminLayout;
