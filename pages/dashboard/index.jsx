import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Skeleton, Alert, SimpleGrid } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import axios from 'axios';

import ProtectedLayout from '@/layouts/ProtectedLayout';
import { AuthContext } from '@/context/Auth';
import CustomCard from '@/components/CustomCard';
import CustomTitle from '@/components/CustomTitle';
import * as Rest from '@/data/restapi';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const Dashboard = () => {
  const router = useRouter();
  const { user, isApproved, setIsApproved, isStaff, setIsStaff } =
    useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [counts, setCounts] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  useEffect(() => {
    const fetchPartnerData = (partnerID) => {
      axios
        .get(Rest.viewPartnerdetails, {
          params: {
            PartnerID: partnerID,
          },
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            const data = res.data.data;
            setProfileData(data);
            if (
              data.InitialOnBoardStatus &&
              data.InitialOnBoardStatus == 'Approved'
            ) {
              window.localStorage.setItem('approved', true);
              setIsApproved(true);
            }

            if (data.ContractDetails && data.ContractDetails.length > 0) {
              const index = data.ContractDetails.findIndex(
                (obj) => obj.Status === 'Active',
              );
              if (index >= 0) {
                window.localStorage.setItem('isStaff', true);
                setIsStaff(true);
              }
            }

            fetchDashboardCounts();
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

    const fetchDashboardCounts = () => {
      axios
        .get(Rest.dashboardCounts, {
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

    setStatus(STATUS_ENUM.LOADING);
    if (user.token) fetchPartnerData(user.partnerID);
  }, [user, setIsApproved, setIsStaff]);

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
  if (
    profileData != undefined &&
    profileData != null &&
    profileData.InitialOnBoardData == 'Pending'
  ) {
    router.replace('/join-us/next');
    return null;
  }

  const bannerOptions = {
    Pending: {
      title: 'We are in the process of approving you as a partner!',
      color: 'orange',
      variant: 'outline',
      description:
        'Look out for an email or a phone call from us soon. In the meantime, feel free to explore the rest of the application.',
    },
    Approved: {
      title: 'You are now an approved partner!',
      color: 'teal',
      variant: 'filled',
      description: 'You can now start using our product.',
    },
    Rejected: {
      title:
        'We are sorry to inform you that your application has been rejected.',
      color: 'red',
      variant: 'filled',
      description: 'Please contact us for more information.',
    },
  };

  return (
    <section>
      <CustomTitle title="Dashboard" />
      {profileData.InitialOnBoardStatus ? (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title={bannerOptions[profileData?.InitialOnBoardStatus].title}
          color={bannerOptions[profileData?.InitialOnBoardStatus].color}
          variant={bannerOptions[profileData?.InitialOnBoardStatus].variant}
        >
          {bannerOptions[profileData?.InitialOnBoardStatus].description}
        </Alert>
      ) : (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title={bannerOptions['Pending'].title}
          color={bannerOptions['Pending'].color}
          variant={bannerOptions['Pending'].variant}
        >
          {bannerOptions['Pending'].description}
        </Alert>
      )}
      <SimpleGrid my={15} cols={2}>
        <CustomCard
          title="Contracts"
          value={counts?.Contracts || 0}
          onClick={() => router.push('/contracts')}
        />
        {isStaff ? (
          <CustomCard
            title="Staff"
            value={counts?.Staff || 0}
            onClick={() => router.push('/staff')}
          />
        ) : (
          <CustomCard
            title="Staff"
            value={counts?.Staff || 0}
            onClick={() => router.push('/staff')}
            isUpcomingFeature
          />
        )}

        <CustomCard title="Finances" isUpcomingFeature />
        <CustomCard title="Job Requests" isUpcomingFeature />
        <CustomCard title="More Features Soon" isUpcomingFeature />
      </SimpleGrid>
    </section>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export default Dashboard;
