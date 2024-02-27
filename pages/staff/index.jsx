import { useContext, useEffect, useState } from 'react';
import { Button, Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import axios from 'axios';

import ProtectedLayout from '@/layouts/ProtectedLayout';
import CustomTitle from '@/components/CustomTitle';
import { StaffTable } from '@/components/Staff';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
const Staff = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [staffData, setStaffData] = useState([]);

  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  useEffect(() => {
    const fetchStaffData = async () => {
      axios
        .post(
          Rest.viewStaff,
          {
            params: {
              PartnerID: user.partnerID,
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

    if (user) fetchStaffData();
  }, [user]);

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
  // if (status !== STATUS_ENUM.SUCCESS) {
  //   return null;
  // }
  return (
    <section>
      <CustomTitle
        title="Staff"
        rightSection={
          <Button
            variant="subtle"
            compact
            onClick={() => router.push('/staff/add')}
          >
            + Add New Member
          </Button>
        }
      />
      <StaffTable data={staffData.reverse()} />
    </section>
  );
};

Staff.getLayout = function getLayout(page) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export default Staff;
