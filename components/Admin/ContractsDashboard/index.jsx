import { SimpleGrid, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { AdminCard } from '@/components/Admin';

const ContractsDashboard = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Title order={2}>Contracts</Title>
      <SimpleGrid cols={3}>
        <AdminCard
          title="All Contracts"
          value={data.AllContracts || 0}
          onClick={() => router.push('/admin/contracts?show=All')}
        />
        <AdminCard
          title="Approved Contracts"
          value={data.ApprovedContracts || 0}
          onClick={() => router.push('/admin/contracts?show=Approved')}
        />
        {/* <AdminCard
          title="Rejected Contracts"
          value={0}
          onClick={() => router.push('/admin/contracts?show=rejected')}
        /> */}
        <AdminCard
          title="Pending Contracts"
          value={data.PendingContracts || 0}
          onClick={() => router.push('/admin/contracts?show=Pending')}
        />
      </SimpleGrid>
    </>
  );
};

export default ContractsDashboard;
