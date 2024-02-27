import { useContext, useState, useEffect } from 'react';
import { Skeleton, Tabs } from '@mantine/core';
import { IconId, IconBriefcase, IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import { AuthContext } from '@/context/Auth';
import CustomTitle from '@/components/CustomTitle';
import {
  BasicDetailsCapture,
  BusinessDetailsCapture,
  CustomAlert,
} from '@/components/Profile';
import * as Rest from '@/data/restapi';
import axios from 'axios';
const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const initialValues = {};
const baseDetails = {};

const PartnerProfile = () => {
  const router = useRouter();
  const { user, isApproved, setIsApproved } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const [saveStatus, setSaveStatus] = useState(STATUS_ENUM.IDLE);

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchPartnerData = (partnerID) => {
      axios
        .get(Rest.viewPartnerdetails, {
          params: {
            PartnerID: partnerID,
          },
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            const data = res.data.data;
            setProfileData(data);
            if (
              data.InitialOnBoardStatus &&
              data.InitialOnBoardStatus == 'Approved'
            ) {
              window.localStorage.setItem('approved', true);
              setIsApproved(true);
            }
          } else {
            alert(res.data.data);
          }
          setStatus(STATUS_ENUM.SUCCESS);
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
    if (user) fetchPartnerData(user.partnerID);
  }, [user, setIsApproved]);

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

  if (
    profileData != undefined &&
    profileData != null &&
    profileData.InitialOnBoardData == 'Pending'
  ) {
    router.replace('/join-us/next');
    return null;
  }

  if (profileData.BankDetails && profileData.BankDetails.length > 0) {
    // let index = profileData.BankDetails.findIndex(
    //   (obj) => obj.VerificationStatus === 'Active',
    // );
    //if (index < 0) {
    const index = profileData.BankDetails.length - 1;
    //}

    initialValues.bankName = profileData.BankDetails[index].BankName;
    initialValues.accountHolderName =
      profileData.BankDetails[index].AccountHolderName;
    initialValues.accountNumber = profileData.BankDetails[index].AccountNumber;
    initialValues.confirmAccountNumber =
      profileData.BankDetails[index].AccountNumber;
    initialValues.ifscCode = profileData.BankDetails[index].IFSCCode;
    initialValues.bankBranch = profileData.BankDetails[index].Branch;
    initialValues.bankAddress = profileData.BankDetails[index].BankAddress;
    initialValues.bankCity = profileData.BankDetails[index].BankCity;
    initialValues.bankState = profileData.BankDetails[index].BankState;
    initialValues.bankPincode = profileData.BankDetails[index].BankPinCode;
    initialValues.bankAccountType = profileData.BankDetails[index].AccountType;
  }

  initialValues.businessRegDoc = profileData.BusinessRegistrationDocument;
  initialValues.panCardDocument = profileData.PanCardDocument;
  initialValues.gstDocument = profileData.GSTDocument;
  initialValues.cancelledCheck = profileData.CancelledCheck;
  initialValues.BankDetailsStatus = profileData.BankDetailsStatus;
  initialValues.pan = profileData.BusinessInfo.PANNumber;
  initialValues.gstin = profileData.BusinessInfo.GSTNumber;
  if (profileData.BusinessInfo.BusinessStartDate != 0) {
    initialValues.businessStartDate =
      profileData.BusinessInfo.BusinessStartDate;
  } else {
    initialValues.businessStartDate = null;
  }

  baseDetails.companyName = profileData.BusinessInfo.PartnerName;
  baseDetails.businessNature = profileData.BusinessInfo.BusinessNature;
  baseDetails.companyWebsite = profileData.BusinessInfo.Website;
  baseDetails.address = profileData.BusinessInfo.StreetAddress;
  baseDetails.landmark = profileData.BusinessInfo.LandMark;
  baseDetails.city = profileData.BusinessInfo.City;
  baseDetails.state = profileData.BusinessInfo.State;
  baseDetails.pincode = profileData.BusinessInfo.PinCode;
  baseDetails.name = profileData.BusinessInfo.ContactName;
  baseDetails.email = profileData.BusinessInfo.EmailID;

  const handleBankingDetailsSubmit = async (data) => {
    try {
      setSaveStatus(STATUS_ENUM.LOADING);
      const formData = new FormData();

      const date = new Date(data.businessStartDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();

      const formattedDate = `${day}-${month}-${year}`;
      formData.append('BusinessRegistrationDocument', data.businessRegDoc);
      formData.append('CancelledCheck', data.cancelledCheck);
      formData.append('PanDoc', data.panDoc);
      formData.append('GSTDoc', data.gstDoc);
      formData.append('PartnerID', user.partnerID);
      formData.append('BusinessStartDate', formattedDate);
      formData.append('AccountHolderName', data.accountHolderName);
      formData.append('AccountNumber', data.accountNumber);
      formData.append('PAN', data.pan);
      formData.append('BankAccountType', data.bankAccountType);
      formData.append('GSTIN', data.gstin);
      formData.append('IFSCCode', data.ifscCode);
      formData.append('BankName', data.bankName);
      formData.append('BankBranch', data.bankBranch);
      formData.append('BankAddress', data.bankAddress);
      formData.append('BankCity', data.bankCity);
      formData.append('BankState', data.bankState);
      formData.append('BankPinCode', data.bankPincode);

      try {
        const response = await axios.post(Rest.createBankDetails, formData, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        });
        if (response.data.code == 'S001') {
          setSaveStatus(STATUS_ENUM.SUCCESS);
          alert('Updated Successfully.');
          router.push('/dashboard');
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

  const handleBaseDetailsSubmit = (data) => {
    try {
      setSaveStatus(STATUS_ENUM.LOADING);
      data.partnerID = user.partnerID;
      axios
        .put(Rest.updateBasicProfileDetails, data, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          if (res.data.code == 'S001') {
            setSaveStatus(STATUS_ENUM.SUCCESS);
            alert('Updated Successfully.');
            router.push('/dashboard');
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

  return (
    <section>
      <CustomTitle title="My Profile" />
      {profileData && !profileData && (
        <CustomAlert
          alerts={[
            {
              id: 1,
              icon: <IconAlertCircle size="1rem" />,
              color: 'red',
              message:
                'You need to add business details before you can initiate a contract with us!',
            },
          ]}
        />
      )}
      <Tabs mt={10} color="dark" variant="outline" defaultValue="basicDetails">
        <Tabs.List>
          <Tabs.Tab value="basicDetails" icon={<IconId size="0.8rem" />}>
            Basic Details
          </Tabs.Tab>

          {isApproved ? (
            <Tabs.Tab
              value="businessDetails"
              icon={<IconBriefcase size="0.8rem" />}
            >
              Business Details
            </Tabs.Tab>
          ) : null}
        </Tabs.List>

        <Tabs.Panel value="businessDetails" pt="xs">
          <BusinessDetailsCapture
            data={initialValues || {}}
            onSubmit={handleBankingDetailsSubmit}
          />
        </Tabs.Panel>

        <Tabs.Panel value="basicDetails" pt="xs">
          <BasicDetailsCapture
            data={baseDetails || {}}
            onSubmit={handleBaseDetailsSubmit}
          />
        </Tabs.Panel>
      </Tabs>
    </section>
  );
};

PartnerProfile.getLayout = function getLayout(page) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export default PartnerProfile;
