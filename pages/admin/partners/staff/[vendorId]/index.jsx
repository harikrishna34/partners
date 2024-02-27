import { useContext, useEffect, useState } from 'react';
import { Button, Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import axios from 'axios';

import ProtectedLayout from '@/layouts/ProtectedLayout';
import CustomTitle from '@/components/CustomTitle';
import { StaffTable } from '@/components/Staff';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
const AdminStaff = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [staffData, setStaffData] = useState([]);

  const { vendorId } = router.query;

  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  useEffect(() => {
    const fetchStaffData = async () => {
      axios
        .post(
          Rest.viewStaff,
          {
            params: {
              PartnerID: vendorId,
            },
          },
          {
            headers: {
              'x-fiftyaccess-token': user.token,
            },
          },
        )
        .then((res) => {
          if (res.data.code == 'S001') {
            const data = res.data.data;
            setStaffData(data);
          } else {
            alert(res.data.data);
          }
          setStatus(STATUS_ENUM.SUCCESS);
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

    if (user && vendorId) fetchStaffData();
  }, [user, vendorId]);

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

  return (
    <section>
      <CustomTitle
        title="Staff"
        rightSection={
          <Button
            variant="subtle"
            compact
            onClick={() => router.push(`${vendorId}/add`)}
          >
            + Add New Member
          </Button>
        }
      />
      <StaffTable data={staffData.reverse()} />
    </section>
  );
};

AdminStaff.getLayout = function getLayout(page) {
  return <AdminProtectedLayout>{page}</AdminProtectedLayout>;
};

export default AdminStaff;
