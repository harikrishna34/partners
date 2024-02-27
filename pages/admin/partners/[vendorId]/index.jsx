import {
  Skeleton,
  Card,
  Flex,
  Group,
  Title,
  Text,
  Button,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';
import { theme } from '@/styles/theme';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
import * as Common from '@/data/common';
import CustomTitle from '@/components/CustomTitle';
import PartnerApprovalModal from '@/components/Admin/PartnerApprovalModal';
import BankApprovalModal from '@/components/Admin/BankApprovalModal';
import axios from 'axios';
import UpdateRateCard from '@/components/Admin/UpdateRateCard';
import UpdateContractStatus from '@/components/Admin/UpdateContractStatus';
const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const PartnersDetailsView = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const [saveStatus, setSaveStatus] = useState(STATUS_ENUM.IDLE);

  const [modal, setModal] = useState({ opened: false, data: {} });
  const onOpen = (rowData) => setModal({ opened: true, data: rowData });
  const onClose = () => setModal({ opened: false, data: {} });

  const [bankModal, setBankModal] = useState({ opened: false, data: {} });
  const onBankOpen = (bankData) =>
    setBankModal({ opened: true, data: bankData });
  const onBankClose = () => setBankModal({ opened: false, data: {} });

  const [contractModal, setContractModal] = useState({
    opened: false,
    data: {},
  });
  const onContractOpen = (rowData) =>
    setContractModal({ opened: true, data: rowData });
  const onContractClose = () => setContractModal({ opened: false, data: {} });

  const [rateCardModal, setRateCardModal] = useState({
    opened: false,
    data: {},
  });

  const onRateCardOpen = (rateCardData) =>
    setRateCardModal({ opened: true, data: rateCardData });

  const onRateCardClose = () => setRateCardModal({ opened: false, data: {} });

  const { vendorId } = router.query;
  const [createContractShow, setCreateContractShow] = useState(false);
  const [viewContractShow, setViewContractShow] = useState(false);
  const [updateContractShow, setUpdateContractShow] = useState(false);

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchPartnerData = () => {
      axios
        .get(Rest.viewPartnerById, {
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
            setProfileData(data);
            const createCon = data.BankDetails.findIndex(
              (obj) => obj.VerificationStatus == 'Active',
            );
            if (createCon >= 0) {
              setCreateContractShow(true);
            }

            if (data.ContractDetails && data.ContractDetails.length > 0) {
              setUpdateContractShow(true);
              setViewContractShow(true);
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
    if (vendorId) fetchPartnerData();
  }, [vendorId, user, setCreateContractShow]);

  const renderHeaderDetails = () => {
    return (
      <Card
        style={{ height: '80px' }}
        shadow="sm"
        padding="md"
        radius="md"
        mb={20}
        withBorder
      >
        <Group position="center" grow>
          <Text fz="md" fw={500}>
            MoU Start Date : {Common.renderDate(profileData.MoUStartDate)}
          </Text>
          <Text fz="md" fw={500}>
            MoU End Date : {Common.renderDate(profileData.MoUExpiryDate)}
          </Text>
          <Text fz="md" fw={500}>
            Status : {profileData.Status}
          </Text>

          <Group position="right">
            {profileData.ContractStatus == 'PendingApprovalFromPartner' ? (
              <Button
                compact
                disabled={viewContractShow == false}
                onClick={() =>
                  window.open(`/admin/agreements/${vendorId}`, '_blank')
                }
              >
                View Contract
              </Button>
            ) : (
              <Button
                compact
                disabled={viewContractShow == false}
                onClick={() => {
                  window.open(profileData.MoUFile, '_blank');
                }}
              >
                View Contract
              </Button>
            )}

            <Button
              compact
              disabled={updateContractShow == false}
              onClick={() => onContractOpen(profileData)}
            >
              Update Contract
            </Button>
          </Group>
        </Group>
      </Card>
    );
  };
  const renderBankDetails = () => {
    if (
      profileData.BankDetails &&
      profileData.BankDetails != undefined &&
      profileData.BankDetails.length > 0
    ) {
      // const index = profileData.BankDetails.findIndex(
      //   (obj) => obj.VerificationStatus === 'Active',
      // );
      const index = profileData.BankDetails.length - 1;
      if (index >= 0) {
        return (
          <Card
            style={{ height: '300px' }}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Group position="apart" bg={theme.primaryColor}>
                <Title fz="md" p={'15px'} color="white">
                  Bank Details
                </Title>
                <Group position="apart">
                  <Group position="apart" pr={10}>
                    <Button
                      compact
                      onClick={() => {
                        profileData.BankDetails[index].GSTIN =
                          profileData.BusinessInfo.GSTNumber;
                        profileData.BankDetails[index].PAN =
                          profileData.BusinessInfo.PANNumber;
                        profileData.BankDetails[index].PartnerID =
                          profileData.PartnerID;
                        if (profileData.BusinessRegistrationDocument) {
                          profileData.BankDetails[
                            index
                          ].BusinessRegistrationDocument =
                            profileData.BusinessRegistrationDocument;
                        }
                        if (profileData.PanCardDocument) {
                          profileData.BankDetails[index].PanCardDocument =
                            profileData.PanCardDocument;
                        }
                        if (profileData.GSTDocument) {
                          profileData.BankDetails[index].GSTDocument =
                            profileData.GSTDocument;
                        }
                        if (profileData.CancelledCheck) {
                          profileData.BankDetails[index].CancelledCheck =
                            profileData.CancelledCheck;
                        }
                        onBankOpen(profileData.BankDetails[index]);
                      }}
                    >
                      Update
                    </Button>
                  </Group>
                </Group>
              </Group>
            </Card.Section>
            <Flex
              justify="flex-start"
              align="flex-start"
              direction="column"
              wrap="wrap"
            >
              <Text>
                Account Holder Name :{' '}
                {profileData.BankDetails[index].AccountHolderName}
              </Text>
              <Text>
                Account Number : {profileData.BankDetails[index].AccountNumber}
              </Text>
              <Text>
                Account Type :{' '}
                {profileData.BankDetails[index].AccountType.toLowerCase()}
              </Text>
              <Text>Bank :{profileData.BankDetails[index].BankName}</Text>
              <Text>Branch : {profileData.BankDetails[index].Branch}</Text>
              <Text>IFSC Code : {profileData.BankDetails[index].IFSCCode}</Text>
              <Text>
                Address :
                {profileData.BankDetails[index].BankAddress ||
                  'NA' + ', ' + profileData.BankDetails[index].BankCity ||
                  ' ' + ', ' + profileData.BankDetails[index].BankState ||
                  ' ' + ', ' + profileData.BankDetails[index].BankPinCode ||
                  ' '}
              </Text>

              <Text>GST Number : {profileData.BusinessInfo.GSTNumber}</Text>
              <Text>PAN Number : {profileData.BusinessInfo.PANNumber}</Text>

              <Text>
                Status :{' '}
                <b>{profileData.BankDetails[index].VerificationStatus}</b>
              </Text>
            </Flex>
          </Card>
        );
      } else {
        const index = profileData.BankDetails.length - 1;
        return (
          <Card
            style={{ height: '300px' }}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Group position="apart" bg={theme.primaryColor}>
                <Title fz="md" p={'15px'} color="white">
                  Bank Details
                </Title>
                <Group position="apart">
                  <Group position="apart" pr={10}>
                    <Button
                      compact
                      onClick={() => {
                        profileData.BankDetails[index].GSTIN =
                          profileData.BusinessInfo.GSTNumber;
                        profileData.BankDetails[index].PAN =
                          profileData.BusinessInfo.PANNumber;
                        profileData.BankDetails[index].PartnerID =
                          profileData.PartnerID;
                        if (profileData.BusinessRegistrationDocument) {
                          profileData.BankDetails[
                            index
                          ].BusinessRegistrationDocument =
                            profileData.BusinessRegistrationDocument;
                        }
                        if (profileData.PanCardDocument) {
                          profileData.BankDetails[index].PanCardDocument =
                            profileData.PanCardDocument;
                        }
                        if (profileData.GSTDocument) {
                          profileData.BankDetails[index].GSTDocument =
                            profileData.GSTDocument;
                        }
                        if (profileData.CancelledCheck) {
                          profileData.BankDetails[index].CancelledCheck =
                            profileData.CancelledCheck;
                        }
                        onBankOpen(profileData.BankDetails[index]);
                      }}
                    >
                      Update
                    </Button>
                  </Group>
                </Group>
              </Group>
            </Card.Section>
            <Flex
              justify="flex-start"
              align="flex-start"
              direction="column"
              wrap="wrap"
            >
              <Text>
                Account Holder Name :{' '}
                {profileData.BankDetails[index].AccountHolderName}
              </Text>
              <Text>
                Account Number : {profileData.BankDetails[index].AccountNumber}
              </Text>
              <Text>
                Account Type :{' '}
                {profileData.BankDetails[index].AccountType.toLowerCase()}
              </Text>
              <Text>Bank :{profileData.BankDetails[index].BankName}</Text>
              <Text>Branch : {profileData.BankDetails[index].Branch}</Text>
              <Text>IFSC Code : {profileData.BankDetails[index].IFSCCode}</Text>
              <Text>
                Address :{' '}
                {profileData.BankDetails[index].BankAddress +
                  ', ' +
                  profileData.BankDetails[index].BankCity +
                  ', ' +
                  profileData.BankDetails[index].BankState +
                  ', ' +
                  profileData.BankDetails[index].BankPinCode}
              </Text>

              <Text>GST Number : {profileData.BusinessInfo.GSTNumber}</Text>
              <Text>PAN Number : {profileData.BusinessInfo.PANNumber}</Text>

              <Text>
                Status :{' '}
                <b>{profileData.BankDetails[index].VerificationStatus}</b>
              </Text>
            </Flex>
          </Card>
        );
      }
    } else {
      return (
        <Card
          style={{ height: '300px' }}
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
        >
          <Card.Section>
            <Group position="apart" bg={theme.primaryColor}>
              <Title fz="md" p={'15px'} color="white">
                Bank Details
              </Title>
              <Group position="apart" pr={10}>
                <Button
                  compact
                  onClick={() => {
                    onBankOpen({});
                  }}
                >
                  Update
                </Button>
              </Group>
            </Group>
          </Card.Section>
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <Text>Account Number :</Text>
            <Text>Account Type : </Text>
            <Text>Bank :</Text>
            <Text>Address :</Text>
            <Text>GST Number : </Text>
            <Text>PAN Number : </Text>
            <Text>Business Start Date : </Text>
          </Flex>
        </Card>
      );
    }
  };
  const renderVendorDetails = () => {
    if (profileData.BusinessInfo && profileData.BusinessInfo != undefined) {
      return (
        <Card
          style={{ height: '300px' }}
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
        >
          <Card.Section>
            <Group position="apart" bg={theme.primaryColor}>
              <Title fz="md" p={'15px'} color="white">
                Partner Details
              </Title>
              <Group position="apart" pr={10}>
                <Button
                  compact
                  onClick={() => onOpen(profileData.BusinessInfo)}
                >
                  Update
                </Button>
              </Group>
            </Group>
          </Card.Section>
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <Text>Company Name : {profileData.BusinessInfo.PartnerName}</Text>
            <Text>
              Company Type :{' '}
              {profileData.BusinessInfo.BusinessNature.toLowerCase()}
            </Text>
            <Text>Company Web Site : {profileData.BusinessInfo.Website}</Text>
            <Text>POC Name : {profileData.BusinessInfo.ContactName}</Text>
            <Text>EmailID : {profileData.BusinessInfo.EmailID}</Text>
            <Text>Contact Number : {profileData.BusinessInfo.ContactNo}</Text>
            <Text>
              Address :{' '}
              {profileData.BusinessInfo.StreetAddress +
                ', ' +
                profileData.BusinessInfo.LandMark +
                ', ' +
                profileData.BusinessInfo.City +
                ', ' +
                profileData.BusinessInfo.State +
                ', ' +
                profileData.BusinessInfo.PinCode}
            </Text>
          </Flex>
        </Card>
      );
    } else {
      return (
        <Card
          style={{ height: '300px' }}
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
        >
          <Card.Section>
            <Group position="apart" bg={theme.primaryColor}>
              <Title fz="md" p={'15px'} color="white">
                Partner Details
              </Title>
              <Group position="apart" pr={10}>
                <Button compact onClick={() => onOpen({})}>
                  Update
                </Button>
              </Group>
            </Group>
          </Card.Section>
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <Text>Company Name : </Text>
            <Text>Company Type :</Text>
            <Text>Company Web Site :</Text>
            <Text>POC Name :</Text>
            <Text>EmailID :</Text>
            <Text>Contact Number : </Text>
            <Text>Address :</Text>
          </Flex>
        </Card>
      );
    }
  };
  const renderServiceAreaDetails = () => {
    if (
      profileData.AreaOfOperations &&
      profileData.AreaOfOperations != undefined &&
      profileData.AreaOfOperations.length > 0
    ) {
      return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Card.Section>
            <Group position="apart" bg={theme.primaryColor}>
              <Title fz="md" p={'15px'} color="white">
                Service Areas Offered
              </Title>
              <Group position="apart" pr={10}></Group>
            </Group>
          </Card.Section>
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            {renderServicesAreas()}
          </Flex>
        </Card>
      );
    } else {
      return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Card.Section>
            <Group position="apart" bg={theme.primaryColor}>
              <Title fz="md" p={'15px'} color="white">
                Service Areas Offered
              </Title>
              <Group position="apart" pr={10}></Group>
            </Group>
          </Card.Section>
          <Flex justify="center" align="center" direction="column" wrap="wrap">
            <br />
            <Text>Services Not found</Text>
          </Flex>
        </Card>
      );
    }
  };
  const renderLanguageDetails = () => {
    if (
      profileData.ServiceInDetails &&
      profileData.ServiceInDetails != undefined &&
      profileData.ServiceInDetails.LanguagesKnown &&
      profileData.ServiceInDetails.LanguagesKnown != undefined
    ) {
      return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Card.Section>
            <Group position="apart" bg={theme.primaryColor}>
              <Title fz="md" p={'15px'} color="white">
                Languages Offered
              </Title>
              <Group position="apart" pr={10}></Group>
            </Group>
          </Card.Section>
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            {renderLanguages()}
          </Flex>
        </Card>
      );
    } else {
      return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Card.Section>
            <Group position="apart" bg={theme.primaryColor}>
              <Title fz="md" p={'15px'} color="white">
                Languages Offered
              </Title>
              <Group position="apart" pr={10}></Group>
            </Group>
          </Card.Section>
          <Flex justify="center" align="center" direction="column" wrap="wrap">
            <br />
            <Text>Languages Not found</Text>
          </Flex>
        </Card>
      );
    }
  };
  const renderServicesAreas = () => {
    return profileData.AreaOfOperations.map((area, i) => (
      <Text key={area.ServiceAreaID}>
        {area.ServiceAreaName.replace(/_/g, ' ')}
      </Text>
    ));
  };
  const renderLanguages = () => {
    return profileData.ServiceInDetails.LanguagesKnown.map((language, lan) => (
      <>
        <Text key={lan}>{language.replace(/_/g, ' ')}</Text>
      </>
    ));
  };
  const renderContractDetails = () => {
    if (
      profileData &&
      profileData.ContractDetails != undefined &&
      profileData.ContractDetails.length > 0
    ) {
      return (
        <Card mt="20px" shadow="sm" padding="md" radius="md" withBorder>
          <Card.Section>
            <Group position="apart" bg={theme.primaryColor}>
              <Title fz="md" p={'15px'} color="white">
                Services and Rates
              </Title>
            </Group>
          </Card.Section>
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            {profileData.ContractDetails &&
              profileData.ContractDetails.length > 0 &&
              profileData.ContractDetails[0]?.RateCard?.[0]?.ReferalType ==
                'Referral_Percentage' && (
                <h5>
                  Following is agreed rate card for each of the services with an
                  Anavyaa referral percentage of{' '}
                  {profileData.ContractDetails &&
                    profileData.ContractDetails[0]?.RateCard?.[0]?.ReferalFee}
                  %. The vendor should invoice in Anvayaa as per final rates
                  mentioned in the rate card provided below.
                </h5>
              )}
            {profileData.ContractDetails &&
              profileData.ContractDetails.length > 0 &&
              profileData.ContractDetails[0]?.RateCard?.[0]?.ReferalType ==
                'Referral_Amount' && (
                <h5>
                  Following is agreed rate card for each of the services with an
                  Anavyaa referral fee is <b>Flat Rate</b>. The vendor should
                  invoice in Anvayaa as per final rates mentioned in the rate
                  card provided below.
                </h5>
              )}

            <table
              style={{
                marginTop: '10px',
                textAlign: 'left',
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead style={{ backgroundColor: '#f8dcee' }}>
                <tr>
                  <th
                    style={{
                      border: '1px solid #000000',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Service
                  </th>
                  <th
                    style={{
                      border: '1px solid #000000',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Tarrif Type
                  </th>

                  <th
                    style={{
                      border: '1px solid #000000',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Proposed Rate
                  </th>

                  <th
                    style={{
                      border: '1px solid #000000',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Final Price
                  </th>

                  <th
                    style={{
                      border: '1px solid #000000',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Location
                  </th>
                  <th
                    style={{
                      border: '1px solid #000000',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      border: '1px solid #000000',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody border={1} width="100%" cellPadding={10}>
                {profileData.ContractDetails.length > 0 ? (
                  profileData.ContractDetails.map((contract, i) =>
                    renderRatesDetails(contract),
                  )
                ) : (
                  <tr>
                    <td colSpan={7}>No Rate Cards Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Flex>
        </Card>
      );
    }
  };
  const renderRatesDetails = (contract) => {
    if (
      contract &&
      contract.RateCard != undefined &&
      contract.RateCard.length > 0
    ) {
      return contract.RateCard.map((rateCard, j) => (
        <tr key={j} style={{ fontSize: '15px' }}>
          <td
            style={{
              border: '1px solid #000000',
              textAlign: 'left',
              padding: '8px',
            }}
          >
            {(rateCard.ServiceDetails && rateCard.ServiceDetails.AliasName) ||
              'NA'}
          </td>
          <td
            style={{
              border: '1px solid #000000',
              textAlign: 'left',
              padding: '8px',
            }}
          >
            {rateCard.TarrifType}
          </td>

          <td
            style={{
              border: '1px solid #000000',
              textAlign: 'left',
              padding: '8px',
            }}
          >
            {rateCard.VendorPrice}
          </td>

          <td
            style={{
              border: '1px solid #000000',
              textAlign: 'left',
              padding: '8px',
            }}
          >
            {rateCard.FinalPrice}
          </td>

          <td
            style={{
              border: '1px solid #000000',
              textAlign: 'left',
              padding: '8px',
            }}
          >
            {(rateCard.ServiceAreaDetails &&
              rateCard.ServiceAreaDetails.CityName) ||
              'NA'}
          </td>
          <td
            style={{
              border: '1px solid #000000',
              textAlign: 'left',
              padding: '8px',
            }}
          >
            {contract.Status}
          </td>
          <td
            style={{
              border: '1px solid #000000',
              textAlign: 'left',
              padding: '8px',
            }}
          >
            <Button
              compact
              onClick={() => onRateCardOpen(rateCard)}
              disabled={contract.Status != 'Pending'}
              //&& contract.Status != 'PartnerAccepted'
            >
              Update
            </Button>
          </td>
        </tr>
      ));
    }
  };
  const handleApproval = (id, reason) => {
    updatePartnerStatus(vendorId, reason, 'Partner', 'Approve');
  };
  const handleRejection = (id, reason) => {
    updatePartnerStatus(vendorId, reason, 'Partner', 'Reject');
  };
  const handleBankApproval = (id, reason) => {
    updatePartnerStatus(vendorId, reason, 'BankDetails', 'Approve');
  };
  const handleBankRejection = (id, reason) => {
    updatePartnerStatus(vendorId, reason, 'BankDetails', 'Reject');
  };
  const updatePartnerStatus = (id, reason, type, status) => {
    axios
      .post(
        Rest.approveApi,
        {
          PartnerID: id,
          Reason: reason,
          Type: type,
          Status: status,
        },
        {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        },
      )
      .then((res) => {
        if (res.data.code == 'S001') {
          alert('Updated Successfully.');
          setSaveStatus(STATUS_ENUM.SUCCESS);
          router.reload();
        } else {
          alert(res.data.data);
          setSaveStatus(STATUS_ENUM.ERROR);
        }
      })
      .catch((error) => {
        setSaveStatus(STATUS_ENUM.ERROR);
        if (error.response && error.response.data && error.response.data.data) {
          alert(error.response.data.data);
        } else {
          alert('Something went wrong. please try again.');
        }
      });
  };
  const updatePartner = (data) => {
    try {
      setSaveStatus(STATUS_ENUM.LOADING);
      data.partnerID = vendorId;
      axios
        .put(Rest.updatePartner, data, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            alert('Updated Successfully.');
            setSaveStatus(STATUS_ENUM.SUCCESS);
            onClose();
            router.reload();
          } else {
            setSaveStatus(STATUS_ENUM.ERROR);
            alert(res.data.data);
          }
        })
        .catch((err) => {
          setSaveStatus(STATUS_ENUM.ERROR);
          if (err.response && err.response.data && err.response.data.data) {
            alert(err.response.data.data);
          } else {
            alert('Something went wrong. please try again.');
          }
        });
    } catch (e) {
      setSaveStatus(STATUS_ENUM.ERROR);
    }
  };
  const updateBankDetails = async (data) => {
    try {
      setSaveStatus(STATUS_ENUM.LOADING);
      const formData = new FormData();
      formData.append('BusinessRegistrationDocument', data.businessRegDoc);
      formData.append('PanDoc', data.panDoc);
      formData.append('GSTDoc', data.gstDoc);
      formData.append('CancelledCheck', data.cancelledCheck);
      formData.append('PartnerID', vendorId);
      formData.append('AccountHolderName', data.accountHolderName);
      formData.append('AccountNumber', data.accountNumber);
      formData.append('PAN', data.pan);
      formData.append('BankAccountType', data.bankAccountType);
      if (data.gstin && data.gstin !== undefined)
        formData.append('GSTIN', data.gstin);
      formData.append('IFSCCode', data.ifscCode);
      formData.append('BankName', data.bankName);
      formData.append('BankBranch', data.bankBranch);
      formData.append('BankAddress', data.bankAddress);
      formData.append('BankCity', data.bankCity);
      formData.append('BankState', data.bankState);
      formData.append('BankPinCode', data.bankPinCode);
      try {
        const response = await axios.post(Rest.updateBankDetails, formData, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        });
        if (response.data.code == 'S001') {
          setSaveStatus(STATUS_ENUM.SUCCESS);
          alert(response.data.data);
          onBankClose();
          router.reload();
        } else {
          setSaveStatus(STATUS_ENUM.ERROR);
          alert(response.data.data);
        }
      } catch (err) {
        setSaveStatus(STATUS_ENUM.ERROR);
        if (err.response && err.response.data && err.response.data.data) {
          alert(err.response.data.data);
        } else {
          alert('Something went wrong. please try again.');
        }
      }
    } catch (e) {
      setSaveStatus(STATUS_ENUM.ERROR);
      alert(e.message);
    }
  };
  const updateRateCard = (data) => {
    axios
      .put(
        Rest.updateContract,
        {
          PartnerID: data.partnerID,
          ContractID: data.contractID,
          ServiceAreaID: data.serviceAreaID,
          CategoryID: data.categoryID,
          SubCategoryID: data.subCategoryID,
          SubSubCategoryID: data.subSubCategoryID,
          VendorPrice: data.partnerPrice,
          MinimumPrice: data.minPrice,
          TarrifType: data.tarrifType,
          ReferalType: data.referalType,
          ReferalFee: data.referalFee,
        },
        {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        },
      )
      .then((res) => {
        if (res.data.code == 'S001') {
          setSaveStatus(STATUS_ENUM.SUCCESS);
          alert('Updated Successfully.');
          onRateCardClose();
          router.reload();
        } else {
          alert(res.data.data);
          setSaveStatus(STATUS_ENUM.ERROR);
        }
      })
      .catch((err) => {
        setSaveStatus(STATUS_ENUM.ERROR);
        if (err.response && err.response.data && err.response.data.data) {
          alert(err.response.data.data);
        } else {
          alert('Something went wrong. please try again.');
        }
      });
  };
  const updateContractStatus = async (data) => {
    try {
      setSaveStatus(STATUS_ENUM.LOADING);
      const formData = new FormData();
      formData.append('MoUFile', data.businessRegDoc);
      formData.append('PartnerID', vendorId);
      formData.append('Status', data.status);
      formData.append('Type', 'Contract');
      formData.append('Reason', data.reason);

      try {
        const response = await axios.post(Rest.updateAdminMoU, formData, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        });

        if (response.data.code == 'S001') {
          setSaveStatus(STATUS_ENUM.SUCCESS);
          alert('Updated Successfully.');
          onContractClose();
          router.reload();
        } else {
          setSaveStatus(STATUS_ENUM.ERROR);
          alert(response.data.data);
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.data) {
          alert(err.response.data.data);
        } else {
          alert('Something went wrong. please try again.');
        }
      }
    } catch (e) {
      setSaveStatus(STATUS_ENUM.ERROR);
      alert(e.message);
    }
  };
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

  return (
    <>
      {modal.opened && (
        <PartnerApprovalModal
          data={modal.data}
          close={onClose}
          onApprove={handleApproval}
          onReject={handleRejection}
          onSubmit={updatePartner}
        />
      )}
      {bankModal.opened && (
        <BankApprovalModal
          data={bankModal.data}
          close={onBankClose}
          onApprove={handleBankApproval}
          onReject={handleBankRejection}
          onSubmit={updateBankDetails}
        />
      )}
      {rateCardModal.opened && (
        <UpdateRateCard
          data={rateCardModal.data}
          close={onRateCardClose}
          onSubmit={updateRateCard}
        />
      )}
      {contractModal.opened && (
        <UpdateContractStatus
          data={contractModal.data}
          close={onContractClose}
          onSubmit={updateContractStatus}
        />
      )}
      <section>
        <CustomTitle
          title="Partner details"
          rightSection={
            <Group>
              {/* <Button
                variant="subtle"
                compact
                onClick={() => router.push(`staff/${vendorId}`)}
                disabled={!createContractShow}
              >
                View Staff
              </Button> */}
              <Button
                variant="subtle"
                compact
                onClick={() => router.push(`initiateContract/${vendorId}`)}
                disabled={!createContractShow}
              >
                + Add New Contract
              </Button>
            </Group>
          }
        />
        {renderHeaderDetails()}
        <Group position="apart" grow>
          {renderVendorDetails()}
          {renderBankDetails()}
        </Group>
        {renderContractDetails()}
        <Group mt="20px" position="apart" grow>
          {renderServiceAreaDetails()}
          {renderLanguageDetails()}
        </Group>
      </section>
    </>
  );
};

PartnersDetailsView.getLayout = function getLayout(page) {
  return <AdminProtectedLayout>{page}</AdminProtectedLayout>;
};

export default PartnersDetailsView;
