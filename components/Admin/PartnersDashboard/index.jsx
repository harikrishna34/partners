import { SimpleGrid, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { AdminCard } from '@/components/Admin';

const PartnersDashboard = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Title order={2}>Partners</Title>
      <SimpleGrid cols={3}>
        <AdminCard
          title="All Partners"
          value={data.AllPartners || 0}
          onClick={() => router.push('/admin/partners?show=All')}
        />
        <AdminCard
          title="Approved Partners"
          value={data.ApprovedPartners || 0}
          onClick={() => router.push('/admin/partners?show=Approved')}
        />
        {/* <AdminCard
          title="Rejected Partners"
          value={0}
          onClick={() => router.push('/admin/partners?show=rejected')}
        /> */}
        <AdminCard
          title="Pending Partners"
          value={data.PendingPartners || 0}
          onClick={() => router.push('/admin/partners?show=Pending')}
        />
      </SimpleGrid>
    </>
  );
};

export default PartnersDashboard;
