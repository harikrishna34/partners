import { useContext, useEffect, useState } from 'react';
import { Button, Skeleton, ScrollArea, Table } from '@mantine/core';
import { useRouter } from 'next/router';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import CustomTitle from '@/components/CustomTitle';
import { AuthContext } from '@/context/Auth';
import axios from 'axios';
import * as Rest from '@/data/restapi';
import * as Common from '@/data/common';
const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
const Contracts = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [contracts, setContracts] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchPartnerData = () => {
      axios
        .get(Rest.viewMyContracts, {
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
    if (user.token) fetchPartnerData();
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
  if (status !== STATUS_ENUM.SUCCESS) {
    return null;
  }

  const ths = (
    <tr>
      <th>Contract ID</th>
      <th>MoUStartDate</th>
      <th>MoUExpiryDate</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  );

  const rows = contracts.map((row, i) => (
    <tr key={i}>
      <td>{row.ContractID}</td>
      <td>
        {row.RateCard &&
          row.RateCard.length > 0 &&
          Common.renderDate(row.RateCard[0].StartDate)}
      </td>
      <td>
        {row.RateCard &&
          row.RateCard.length > 0 &&
          Common.renderDate(row.RateCard[0].EndDate)}
      </td>
      <td>{row.Status}</td>
      <td>
        <Button onClick={() => router.push(`contracts/${row.ContractID}`)}>
          View
        </Button>
      </td>
    </tr>
  ));
  return (
    <>
      <CustomTitle title="Contracts & Rate Cards" />
      <ScrollArea>
        <Table verticalSpacing="md" striped withColumnBorders withBorder>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

Contracts.getLayout = function getLayout(page) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export default Contracts;
