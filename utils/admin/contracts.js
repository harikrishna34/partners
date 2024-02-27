export const getContractsInfo = (contractsData = [], vendorsInfo = []) => {
  const contractsMap = new Map(
    contractsData.map((contract) => [contract.id, contract]),
  );
  const allContracts = vendorsInfo.reduce((acc, vendor) => {
    if (vendor.approval === 'APPROVED' && vendor && vendor.contractIds) {
      for (const contractId of vendor.contractIds) {
        if (contractsMap.has(contractId)) {
          acc.push({
            contract: { ...contractsMap.get(contractId) },
            vendorDetails: { ...vendor },
          });
        }
      }
    }
    return acc;
  }, []);

  return {
    allContracts,
    approvedContracts: allContracts.filter(
      (contract) => contract.contract.status === 'APPROVED',
    ),
    pendingContracts: allContracts.filter(
      (contract) => contract.contract.status === 'PENDING',
    ),
    rejectedContracts: allContracts.filter(
      (contract) => contract.contract.status === 'REJECTED',
    ),
  };
};
