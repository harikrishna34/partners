import {
  Skeleton,
  Card,
  Flex,
  Group,
  Title,
  Text,
  Button,
  Stepper,
  FileInput,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import { theme } from '@/styles/theme';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
import * as Common from '@/data/common';
import CustomTitle from '@/components/CustomTitle';
import axios from 'axios';
import UpdateContractStatus from '@/components/Admin/UpdateContractStatus';
const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const ContractDetailsView = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const [uploadStatus, setUploadStatus] = useState(STATUS_ENUM.IDLE);

  const [active, setActive] = useState(1);
  const [contractModal, setContractModal] = useState({
    opened: false,
    data: {},
  });
  const onContractOpen = (rowData) =>
    setContractModal({ opened: true, data: rowData });
  const onContractClose = () => setContractModal({ opened: false, data: {} });

  const initialValues = {
    businessRegDoc: '',
  };
  const form = useForm({
    initialValues,
    validate: {
      businessRegDoc: (value) =>
        value == undefined || value == null || value == ''
          ? 'Required agreement doc'
          : null,
    },
  });
  const { contractId } = router.query;
  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchPartnerData = () => {
      axios
        .get(Rest.viewContractById, {
          params: {
            ContractID: contractId,
          },
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            const data = res.data.data;
            setProfileData(data);
            if (data.Status === 'PartnerAccepted') {
              setActive(2);
            }
            if (data.Status === 'Approved') {
              setActive(3);
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
            alert('Something went wrong. please try again.');
          }
        });
    };
    if (contractId && user.token) {
      fetchPartnerData();
    }
  }, [contractId, user.token]);
  function ContractView() {
    return (
      <Text size="sm">
        <br />
        To view the contract, please click on the <b>
          View and Print Contract
        </b>{' '}
        button below. <br />
        <b>Instructions:</b>
        <ol>
          <li>
            Click on the <b>View and Print Contract</b> button to open the
            contract in a new window or tab.
          </li>
          <li>Review the contract content thoroughly.</li>
          <li>
            If you wish to print a hard copy of the agreement, press Ctrl+P (or
            Command+P on Mac) to open the print dialog.
          </li>
          <li>
            Adjust the print settings as needed (e.g., select a printer, page
            orientation, etc.).
          </li>
          <li>
            Click on the <b>Print</b> button in the print dialog to print the
            agreement.
          </li>
        </ol>
        Please note that the contract is a legally binding document. Ensure that
        you carefully review the terms and conditions before proceeding. If you
        have any questions or concerns regarding the contract, please contact
        our support team for assistance.
        <br />
        <br />
      </Text>
    );
  }
  const renderHeaderDetails = () => {
    return (
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Card.Section>
          <Group position="apart" bg={theme.primaryColor}>
            <Title fz="md" p={'15px'} color="white">
              Step 1: View and Print Contract
            </Title>
          </Group>
        </Card.Section>
        {profileData.ContractDetails.Status != 'Pending'
          ? null
          : ContractView()}
        <Group position="center" grow>
          <Text fz="md" fw={500}>
            MoU Start Date : {Common.renderDate(profileData.MoUStartDate)}
          </Text>
          <Text fz="md" fw={500}>
            MoU End Date : {Common.renderDate(profileData.MoUExpiryDate)}
          </Text>
          <Text fz="md" fw={500}>
            Status : {profileData.ContractDetails.Status}
          </Text>
          <Group position="center">
            <Text fz="md" fw={500}>
              Contract :
            </Text>
            {profileData.ContractDetails.Status != 'Pending' ? (
              <Button
                compact
                onClick={() => {
                  window.open(profileData.MoUFile, '_blank');
                }}
              >
                View Contract
              </Button>
            ) : (
              <Button
                compact
                onClick={
                  () => {
                    setActive(1);
                    window.open(
                      `/admin/agreements/${profileData.PartnerID}`,
                      '_blank',
                    );
                  }
                  //router.push(`/admin/agreements/${profileData.PartnerID}`)
                }
              >
                View and Print Contract
              </Button>
            )}
          </Group>
        </Group>
      </Card>
    );
  };
  function updateContractInstructions() {
    return (
      <>
        <Text size="sm">
          <br />
          - To proceed with your contract, we kindly request that you upload a
          scanned or digital copy of the signed agreement. This ensures that
          both parties have acknowledged and accepted the terms and conditions
          outlined in the contract.
          <br />
          <b>Instructions:</b>
          <ol>
            <li>Ensure that the signed agreement is in a PDF format.</li>
            <li>
              Click on the <b>Upload Agreement</b> button below.
            </li>
            <li>Select the file from your computer or device.</li>
            <li>Review the uploaded document to ensure its accuracy.</li>
            <li>
              Once uploaded, our team will review and process your contract
              approval accordingly.
            </li>
          </ol>
          - Please note that the contract will only be considered valid and
          binding upon successful verification of the uploaded agreement.
          <br />
          <b>
            - If you have any questions or encounter any issues during the
            upload process, please do not hesitate to reach out to our support
            team for assistance.
          </b>
          <br />
        </Text>
        <br />
        <form onSubmit={form.onSubmit(uploadDoc)}>
          <Group position="apart" grow>
            <FileInput
              placeholder="Select file"
              label="Browse file"
              description="Select signed doc here"
              variant="filled"
              radius="md"
              size="md"
              withAsterisk
              accept="pdf"
              name="businessRegDoc"
              {...form.getInputProps('businessRegDoc')}
              icon={<IconUpload size={rem(14)} />}
            />
          </Group>

          <Group position="right">
            <Button mt={45} compact type="submit">
              Upload agreement
            </Button>
            <br />
          </Group>
        </form>
      </>
    );
  }
  const uploadSignedContract = () => {
    return (
      <Card mt="20px" shadow="sm" padding="md" radius="md" withBorder>
        <Card.Section>
          <Group position="apart" bg={theme.primaryColor}>
            <Title fz="md" p={'15px'} color="white">
              Step 2: Upload Signed Contract
            </Title>
          </Group>
        </Card.Section>
        {updateContractInstructions()}
      </Card>
    );
  };
  const uploadDoc = async (values) => {
    try {
      setUploadStatus(STATUS_ENUM.LOADING);
      const formData = new FormData();
      formData.append('MoUFile', values.businessRegDoc);
      formData.append('PartnerID', user.partnerID);
      try {
        const response = await axios.post(Rest.uploadMoU, formData, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        });
        if (response.data.code == 'S001') {
          setUploadStatus(STATUS_ENUM.SUCCESS);
          alert(response.data.data);
          router.reload();
        } else {
          setUploadStatus(STATUS_ENUM.ERROR);
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
      setUploadStatus(STATUS_ENUM.ERROR);
      alert(e.message);
    }
  };
  const renderContractDetails = () => {
    if (
      profileData &&
      profileData.ContractDetails &&
      profileData.ContractDetails != undefined
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
              profileData.ContractDetails?.RateCard?.[0]?.ReferalType ==
                'Referal_Percentage' && (
                <h5>
                  Following is agreed rate card for each of the services with an
                  Anavyaa referral percentage of{' '}
                  {profileData.ContractDetails &&
                    profileData.ContractDetails?.RateCard?.[0]?.ReferalFee}
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
                </tr>
              </thead>
              <tbody border={1} width="100%" cellPadding={10}>
                {profileData.ContractDetails ? (
                  renderRatesDetails(profileData.ContractDetails)
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
    } else {
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
          ></Flex>
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
            {rateCard.ServiceDetails.AliasName}
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
            {rateCard.ServiceAreaDetails.CityName}
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
        </tr>
      ));
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
  if (status != STATUS_ENUM.SUCCESS) {
    return <Text>Contract details not found</Text>;
  }
  const updateContractStatus = (data, reason, status) => {
    updatePartnerStatus(data, reason, 'Contract', status);
  };
  const updatePartnerStatus = (id, reason, type, status) => {
    if (status == 'Approve') {
      status = 'Accept';
    }
    axios
      .post(
        Rest.acceptContract,
        {
          PartnerID: user.partnerID,
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
          const data = res.data.data;
          setProfileData(data);
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
  return (
    <section>
      {contractModal.opened && (
        <UpdateContractStatus
          data={contractModal.data}
          close={onContractClose}
          onApprove={updateContractStatus}
          onReject={updateContractStatus}
          onTerminate={updateContractStatus}
        />
      )}
      <CustomTitle title="Contract details" />
      <br></br>

      <Stepper
        size="xl"
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step
          label="Print Contract"
          description="Step 1"
        ></Stepper.Step>
        <Stepper.Step label="Send Contract" description="Step 2"></Stepper.Step>
        <Stepper.Step
          label="Approved Contract"
          description="Step 3"
        ></Stepper.Step>
      </Stepper>

      <br></br>
      {renderHeaderDetails()}
      {profileData.ContractDetails.Status != 'Pending'
        ? null
        : uploadSignedContract()}
      {renderContractDetails()}
    </section>
  );
};

ContractDetailsView.getLayout = function getLayout(page) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export default ContractDetailsView;
