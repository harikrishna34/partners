import { ScrollArea, Skeleton } from '@mantine/core';
import { useContext, useEffect, useState, useRef } from 'react';
import HomeHealthCare from '@/pages/contracts/agreement/home-health-care';
import { useRouter } from 'next/router';
import * as Rest from '@/data/restapi';
import * as Common from '@/data/common';
import { AuthContext } from '@/context/Auth';
import axios from 'axios';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
const HomeHealthCareMouCard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const { vendorId } = router.query;
  const reportTemplateRef = useRef(null);

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchPartnerData = () => {
      axios
        .get(Rest.viewPartnerForMou, {
          params: {
            PartnerID: vendorId,
          },
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            const data = res.data.data;
            if (data.ContractDetails && data.ContractDetails.length > 0) {
              const index = data.ContractDetails.findIndex(
                (obj) => obj.Status == 'Pending',
              );
              const contract = [];
              contract.push(data.ContractDetails[index]);
              delete data.ContractDetails;
              data.ContractDetails = contract;
              setProfileData(data);
            } else {
              setProfileData(data);
            }
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
    if (vendorId && user.token) fetchPartnerData();
  }, [vendorId, user.token]);

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

  if (status != STATUS_ENUM.SUCCESS) {
    return null;
  }
  //if (profileData.serviceOffered == 'HOME_HEALTH_CARE') {
  return (
    <ScrollArea>
      <div ref={reportTemplateRef}>
        <HomeHealthCare data={profileData} />
      </div>
    </ScrollArea>
  );
  // } else {
  //   return (
  //     <ScrollArea>
  //       <div ref={reportTemplateRef}></div>
  //     </ScrollArea>
  //   );
  // }
};

export default HomeHealthCareMouCard;
