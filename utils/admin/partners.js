export const getPartnersInfo = (partners) => {
  const allPartners = partners;
  const rejectedPartners = allPartners.filter(
    (partner) => partner.approval === 'REJECTED',
  );
  const approvedPartners = allPartners.filter(
    (partner) => partner.approval === 'APPROVED',
  );
  const pendingPartners = allPartners.filter(
    (partner) => partner.approval === 'PENDING',
  );

  return {
    allPartners,
    rejectedPartners,
    approvedPartners,
    pendingPartners,
  };
};
