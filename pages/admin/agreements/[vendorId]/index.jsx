import { Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';

import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';
import { HomeHealthCareMouCard } from '@/components/Admin';

const HomeHealthCareMOU = () => {
  const router = useRouter();

  const { vendorId, contractId } = router.query;

  // if (contractDataLoading || vendorDataLoading) {
  //   return (
  //     <>
  //       <Skeleton height={8} mt={6} width="100%" radius="xl" />
  //       <Skeleton height={8} mt={6} width="100%" radius="xl" />
  //       <Skeleton height={8} mt={6} width="100%" radius="xl" />
  //       <Skeleton height={8} mt={6} width="100%" radius="xl" />
  //     </>
  //   );
  // }
  return (
    <section>
      <HomeHealthCareMouCard />
    </section>
  );
};

HomeHealthCareMOU.getLayout = function getLayout(page) {
  return <AdminProtectedLayout noNavs>{page}</AdminProtectedLayout>;
};

export default HomeHealthCareMOU;
