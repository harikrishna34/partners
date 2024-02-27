import { Title, Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';
import { getContractsInfo } from '@/utils/admin/contracts';
import { ContractsTable } from '@/components/Admin';
import { AuthContext } from '@/context/Auth';
import axios from 'axios';
import * as Rest from '@/data/restapi';
const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
const Contracts = () => {
  const router = useRouter();
  const { show } = router.query;
  const { user } = useContext(AuthContext);
  const [contracts, setContracts] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);

  let text = 'All Contracts';
  if (show === 'Approved') {
    text = 'Approved Contracts';
  } else if (show === 'Rejected') {
    text = 'Rejected Contracts';
  } else if (show === 'Pending') {
    text = 'Pending Contracts';
  }

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchPartnerData = () => {
      axios
        .get(Rest.viewAllContracts, {
          params: {
            Status: show,
          },
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            const data = res.data.data;
            setContracts(data);
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
            alert(err.message);
          }
        });
    };
    if (user.token && show) {
      fetchPartnerData();
    }
  }, [user.token, show]);

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
  if (status !== STATUS_ENUM.SUCCESS) {
    return null;
  }

  return (
    <section>
      <Title order={2} mb={10}>
        {text}
      </Title>
      <ContractsTable data={contracts.reverse()} />
    </section>
  );
};

Contracts.getLayout = function getLayout(page) {
  return <AdminProtectedLayout>{page}</AdminProtectedLayout>;
};

export default Contracts;
