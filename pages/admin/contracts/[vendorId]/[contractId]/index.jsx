import { Skeleton, Space } from '@mantine/core';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';
import { initialize } from '@/firebase';
import { ContractCard, VendorCard } from '@/components/Admin';

const ContractPage = () => {
  const router = useRouter();

  const { vendorId, contractId } = router.query;

  const { firestore } = initialize();

  const [vendorData, vendorDataLoading, vendorDataError] = useDocumentData(
    doc(firestore, 'vendors', `${vendorId}`),
  );

  const [contractData, contractDataLoading, contractDataError] =
    useDocumentData(doc(firestore, 'contracts', `${contractId}`));

  if (contractDataLoading || vendorDataLoading) {
    return (
      <>
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
      </>
    );
  }

  const onApproveContract = (comment) => {
    const refToUpdate = doc(firestore, 'contracts', contractId);
    updateDoc(refToUpdate, {
      status: 'APPROVED',
      comments: comment,
      updatedOn: serverTimestamp(),
    });

    router.push('/admin/contracts');
  };

  const onRejectContract = (comment) => {
    const refToUpdate = doc(firestore, 'contracts', contractId);
    updateDoc(refToUpdate, {
      status: 'REJECTED',
      comments: comment,
      updatedOn: serverTimestamp(),
    });

    router.push('/admin/contracts');
  };

  return (
    <section>
      <VendorCard {...vendorData} />
      <Space h="sm" />
      <ContractCard
        {...contractData}
        {...router.query}
        onApprove={onApproveContract}
        onReject={onRejectContract}
      />
    </section>
  );
};

ContractPage.getLayout = function getLayout(page) {
  return <AdminProtectedLayout>{page}</AdminProtectedLayout>;
};

export default ContractPage;
