import { useContext, useState, useEffect } from 'react';
import {
  Title,
  Badge,
  Center,
  rem,
  Stepper,
  Notification,
  Skeleton,
} from '@mantine/core';
import {
  IconAmbulance,
  IconHomeHeart,
  IconHandStop,
  IconPencilPlus,
} from '@tabler/icons-react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
import {
  BaseDetailsCapture,
  OperationDetails,
  ServiceSelector,
  ThankYou,
} from '@/components/OnBoarding';
import ProtectedLayout from '@/layouts/ProtectedLayout';

const cards = [
  {
    id: 'AMBULANCE_SERVICE',
    title: 'Ambulance Service',
    description: 'Emerygency services such as ambulance, paramedic, and more..',
    icon: <IconAmbulance size={rem(150)} stroke={1.5} />,
  },
  {
    id: 'HOME_HEALTH_CARE',
    title: 'Home Health Care',
    description: 'Services such as physical therapy, nursing, and more..',
    icon: <IconHomeHeart size={rem(150)} stroke={1.5} />,
  },
  {
    id: 'DAILY_ASSISTANCE',
    title: 'Daily Assistance',
    description: 'Services such as cooking, cleaning, and other daily tasks.',
    icon: <IconHandStop size={rem(150)} stroke={1.5} />,
  },
  {
    id: 'OTHER_SERVICE',
    title: 'Other Service',
    description:
      'You offer a service that is not listed? Great! We can still help you.',
    icon: <IconPencilPlus size={rem(150)} stroke={1.5} />,
  },
];

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const Next = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [choiceID, setChoiceID] = useState('');
  const [baseDetails, setBaseDetails] = useState({});
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const { loading, isLogin, signOutLoading } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const [homeHealthServicesOffered, setHomeHealthServicesOffered] = useState(
    [],
  );
  const [dailyAssistServicesOffered, setDailyAssistServicesOffered] = useState(
    [],
  );
  const [otherServicesOffered, setOtherServicesOffered] = useState([]);
  const [langSpoken, setLangSpoken] = useState([]);
  const [areaOfOperations, setAreaOfOperations] = useState([]);

  const [homeHealthServicesOfferedData, setHomeHealthServicesOfferedData] =
    useState([]);
  const [dailyAssistServicesOfferedData, setDailyAssistServicesOfferedData] =
    useState([]);
  const [otherServicesOfferedData, setOtherServicesOfferedData] = useState([]);
  const [areaOfOperationsData, setAreaOfOperationsData] = useState([]);

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const getServices = () => {
      axios
        .post(
          Rest.viewAllCategoriesDetails,
          {},
          {
            headers: {
              'x-fiftyaccess-token': user.token,
            },
          },
        )
        .then((res) => {
          const data = res.data;
          if (data.code == 'S001') {
            const SubCategories = data.data.subcategories;
            SubCategories.map((service, index) => {
              if (service.CategoryTypeID == 'AKCS1') {
                let obj = {};
                const serviceObj = {};
                serviceObj.AliasName = service.AliasName;
                serviceObj.ServiceName = service.SubCategoryName;
                serviceObj.ServiceID = service.SubCategoryID;
                obj.value = service.SubCategoryID;
                obj.label = service.AliasName;
                setHomeHealthServicesOfferedData((oldArray) => [
                  ...oldArray,
                  serviceObj,
                ]);
                setHomeHealthServicesOffered((oldArray) => [...oldArray, obj]);
              }
              if (service.CategoryTypeID == 'AKCS3') {
                let obj = {};
                const serviceObj = {};
                serviceObj.AliasName = service.AliasName;
                serviceObj.ServiceName = service.SubCategoryName;
                serviceObj.ServiceID = service.SubCategoryID;
                obj.value = service.SubCategoryID;
                obj.label = service.AliasName;
                setDailyAssistServicesOfferedData((oldArray) => [
                  ...oldArray,
                  serviceObj,
                ]);
                setDailyAssistServicesOffered((oldArray) => [...oldArray, obj]);
              }
              if (
                service.CategoryTypeID == 'AKCS5' ||
                service.CategoryTypeID == 'AKCS41'
              ) {
                let obj = {};
                const serviceObj = {};
                serviceObj.AliasName = service.AliasName;
                serviceObj.ServiceName = service.SubCategoryName;
                serviceObj.ServiceID = service.SubCategoryID;
                obj.value = service.SubCategoryID;
                obj.label = service.AliasName;
                setOtherServicesOfferedData((oldArray) => [
                  ...oldArray,
                  serviceObj,
                ]);
                setOtherServicesOffered((oldArray) => [...oldArray, obj]);
              }
            });
          } else {
          }

          setStatus(STATUS_ENUM.SUCCESS);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.data) {
            alert(err.response.data.data);
          } else {
            alert('Something went wrong. please try again.');
          }
        });
    };

    const getLanguages = () => {
      axios
        .get(Rest.viewLanguages, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code == 'S001') {
            const lang = data.data;
            lang.map((language, index) => {
              let obj = {};
              obj.value = language;
              obj.label = language;
              setLangSpoken((oldArray) => [...oldArray, obj]);
            });
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.data) {
            alert(err.response.data.data);
          } else {
            alert('Something went wrong. please try again.');
          }
        });
    };

    const fetchLocationsData = () => {
      axios
        .post(Rest.viewAllServiceAreas, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          const location = res.data.data;
          location.map((location, index) => {
            if (location.Status == 'Active') {
              const loc = {};
              const loctionObj = {};
              loctionObj.CityID = location.CityID;
              loctionObj.CityName = location.CityName;
              loc.value = location.CityID;
              loc.label = location.CityName;
              setAreaOfOperationsData((oldArray) => [...oldArray, loctionObj]);
              setAreaOfOperations((oldArray) => [...oldArray, loc]);
            }
          });
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.data) {
            alert(err.response.data.data);
          } else {
            alert('Something went wrong. please try again.');
          }
        });
    };

    if (user) {
      getLanguages();
      getServices();
      fetchLocationsData();
    }
  }, [user]);

  if (loading && isLogin && status == STATUS_ENUM.LOADING) {
    return (
      <>
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
      </>
    );
  }

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleServiceClick = (value) => {
    if (choiceID == value) {
      setChoiceID('');
      return;
    }
    setChoiceID(value);
    nextStep();
  };
  const handleBaseDetailsSubmit = (details) => {
    setBaseDetails(details);
    nextStep();
  };
  const handleOperationDetailsSubmit = async (details) => {
    try {
      setStatus(STATUS_ENUM.LOADING);
      const ServicesOffered = [];
      const AreaOfOperations = [];
      if (
        details.homeHealthServicesOffered &&
        details.homeHealthServicesOffered != undefined &&
        details.homeHealthServicesOffered.length > 0
      ) {
        details.homeHealthServicesOffered.map((id) => {
          const index = homeHealthServicesOfferedData.findIndex(
            (obj) => obj.ServiceID == id,
          );
          ServicesOffered.push(homeHealthServicesOfferedData[index]);
        });
      }
      if (
        details.otherServicesOffered &&
        details.otherServicesOffered != undefined &&
        details.otherServicesOffered.length > 0
      ) {
        details.otherServicesOffered.map((id) => {
          const index = otherServicesOfferedData.findIndex(
            (obj) => obj.ServiceID == id,
          );
          ServicesOffered.push(otherServicesOfferedData[index]);
        });
      }
      if (
        details.dailyAssistServicesOffered &&
        details.dailyAssistServicesOffered != undefined &&
        details.dailyAssistServicesOffered.length > 0
      ) {
        details.dailyAssistServicesOffered.map((id) => {
          const index = dailyAssistServicesOfferedData.findIndex(
            (obj) => obj.ServiceID == id,
          );
          ServicesOffered.push(dailyAssistServicesOfferedData[index]);
        });
      }
      details.areaOfOperations.map((id) => {
        const index = areaOfOperationsData.findIndex((obj) => obj.CityID == id);
        AreaOfOperations.push(areaOfOperationsData[index]);
      });

      const obj = {};
      obj.PartnerID = user.partnerID;
      obj.CompanyName = baseDetails.companyName;
      obj.CompanyType = baseDetails.companyType;
      obj.AddressLine1 = baseDetails.addressLine1;
      obj.AddressLine2 = baseDetails.addressLine2;
      obj.City = baseDetails.city;
      obj.State = baseDetails.state;
      obj.Pincode = baseDetails.pincode;
      obj.FirstName = baseDetails.firstName;
      obj.LastName = baseDetails.lastName;
      obj.companyWebsite = baseDetails.companyWebsite;
      obj.Email = baseDetails.email;
      obj.OtherServices = details.otherHomeHealthSerivces;
      obj.OtherLanguages = details.otherLang;
      obj.ServicesOffered = ServicesOffered;
      obj.Languages = details.langSpoken;
      obj.AreaOfOperations = AreaOfOperations;

      axios
        .post(Rest.partnerInitiate, obj, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code == 'S001') {
            router.push('/partner-profile');
          } else {
            alert(data.data.data);
          }
          setStatus(STATUS_ENUM.SUCCESS);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.data) {
            alert(err.response.data.data);
          } else {
            alert('Something went wrong. please try again.');
          }
        });
    } catch (e) {
      setStatus(STATUS_ENUM.ERROR);
    }
  };
  const renderBadge = () => {
    let text = 'What Service Do You Offer?';
    if (active == 1) {
      text = 'Tell Us About Your Company';
    } else {
      text = 'Tell Us About Your Business';
    }

    return (
      <Badge my={15} color="orange" size="lg" radius="sm" variant="filled">
        {text}
      </Badge>
    );
  };

  return (
    <section>
      {active == 3 ? (
        <ThankYou />
      ) : status == STATUS_ENUM.LOADING ? (
        <Notification
          loading
          title="Loading please wait"
          withCloseButton={false}
        >
          Please wait until data is loaded.
        </Notification>
      ) : (
        <>
          <Title order={4} my={5} ta="center">
            Let&apos;s Continue Your Onboarding
          </Title>
          <Center>{renderBadge()}</Center>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="First step" description="Service Type">
              <ServiceSelector
                selected={choiceID}
                cards={cards}
                handleClick={handleServiceClick}
                onNext={nextStep}
              />
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Base Details">
              <BaseDetailsCapture
                onPrev={prevStep}
                onSubmit={handleBaseDetailsSubmit}
              />
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Operation Details">
              <OperationDetails
                key={choiceID}
                serviceID={choiceID}
                homeHealthServicesOffered={homeHealthServicesOffered}
                dailyAssistServicesOffered={dailyAssistServicesOffered}
                otherServicesOffered={otherServicesOffered}
                langSpoken={langSpoken}
                areaOfOperations={areaOfOperations}
                onSubmit={handleOperationDetailsSubmit}
              />
            </Stepper.Step>
          </Stepper>
        </>
      )}
    </section>
  );
};

Next.getLayout = function getLayout(page) {
  return <ProtectedLayout noActions>{page}</ProtectedLayout>;
};

export default Next;
