import { Skeleton, Select } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';
import { PartnerTable } from '@/components/Admin';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
import axios from 'axios';
import CustomTitle from '@/components/CustomTitle';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
const Partners = () => {
  const router = useRouter();
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const { show } = router.query;
  const { user } = useContext(AuthContext);
  const [partners, setPartners] = useState([]);

  let text = 'All';
  if (show === 'Approved') {
    text = 'Approved';
  } else if (show === 'Rejected') {
    text = 'Rejected';
  } else if (show === 'Pending') {
    text = 'Pending';
  }

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchPartnerData = () => {
      axios
        .get(Rest.viewPartners, {
          params: {
            Type: text,
          },
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            const data = res.data.data;
            setPartners(data);
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
    if (text && user.token) fetchPartnerData();
  }, [text, user.token]);

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

  const handleApproval = (id, reason) => {};

  const handleRejection = (id, reason) => {};

  const callApi = (value) => {
    text = value;
    axios
      .get(Rest.viewPartners, {
        params: {
          Type: text,
        },
        headers: {
          'x-fiftyaccess-token': user.token,
        },
      })
      .then((res) => {
        if (res.data.code == 'S001') {
          const data = res.data.data;
          setPartners(data);
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

  return (
    <section>
      <CustomTitle
        title={`${text} Partners`}
        rightSection={
          <Select
            placeholder="Select status"
            onChange={callApi}
            data={[
              { value: 'All', label: 'All' },
              { value: 'Approved', label: 'Approved' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Rejected', label: 'Rejected' },
            ]}
          />
        }
      />
      <PartnerTable
        data={partners.reverse()}
        // onApprove={handleApproval}
        // onReject={handleRejection}
      />
    </section>
  );
};

Partners.getLayout = function getLayout(page) {
  return <AdminProtectedLayout>{page}</AdminProtectedLayout>;
};

export default Partners;
