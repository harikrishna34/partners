import { Skeleton, Divider } from '@mantine/core';
import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';
import { ContractsDashboard, PartnersDashboard } from '@/components/Admin';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [counts, setCounts] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchDashboardCounts = () => {
      axios
        .get(Rest.viewAdminCounts, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            const data = res.data.data;
            setCounts(data);
            setStatus(STATUS_ENUM.SUCCESS);
          } else {
            alert(res.data.data);
            setStatus(STATUS_ENUM.ERROR);
          }
        })
        .catch((err) => {
          setStatus(STATUS_ENUM.ERROR);
          if (err.response && err.response.data && err.response.data.data) {
            alert(err.response.data.data);
          } else {
            alert('Something went wrong. please try again.');
          }
        });
    };
    if (user.token) fetchDashboardCounts();
  }, [user.token]);

  if (status == STATUS_ENUM.LOADING) {
    return (
      <>
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
      </>
    );
  }
  if (status == STATUS_ENUM.SUCCESS) {
    return (
      <section>
        <PartnersDashboard data={counts} />
        <Divider my={10} />
        <ContractsDashboard data={counts} />
      </section>
    );
  }
};

AdminDashboard.getLayout = function getLayout(page) {
  return <AdminProtectedLayout>{page}</AdminProtectedLayout>;
};

export default AdminDashboard;
