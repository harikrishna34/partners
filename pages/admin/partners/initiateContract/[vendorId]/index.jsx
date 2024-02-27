import { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import * as Rest from '@/data/restapi';
import {
  Button,
  Group,
  ActionIcon,
  Box,
  Accordion,
  Stack,
  Card,
  Text,
  Select,
  NumberInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import SignatureCanvas from 'react-signature-canvas';
import CustomTitle from '@/components/CustomTitle';
import { AuthContext } from '@/context/Auth';
import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';
import AddRateCard from '@/components/Admin/AddRateCard';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
function AccordionControl({ onDelete, showActionButton, ...props }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Accordion.Control {...props} />
      {showActionButton && (
        <ActionIcon onClick={onDelete} size="lg">
          <IconTrash size="1.5rem" color="red" />
        </ActionIcon>
      )}
    </Box>
  );
}
let locationId = 1;
let serviceId = 1;
const initialValues = {
  startDate: null,
  endDate: null,
  referalType: 'Referral_Fee',
  referalFee: 0,
  rateCards: [
    {
      id: locationId,
      location: '',
      services: [
        {
          id: serviceId,
          name: '',
          partnerRateMontly: 0,
          partnerRateDaily: 0,
          partnerRateOnetime: 0,
          montlyReferralPercentage: 0,
          dailyReferralPercentage: 0,
          onetimeReferralPercentage: 0,
          partnerFinalRateMontly: 0,
          partnerFinalRateDaily: 0,
          partnerFinalRateOnetime: 0,
        },
      ],
    },
  ],
};
const InitiateContract = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const signRef = useRef();
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [servicesOfferedData, setServicesOfferedData] = useState([]);
  const [subServicesOffered, setSubServicesOffered] = useState([]);
  const [subServicesOfferedData, setSubServicesOfferedData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const { vendorId } = router.query;

  const form = useForm({
    initialValues,
    validate: {
      startDate: (value) =>
        value == null ? 'Required Contract Start Date' : null,
      endDate: (value) => (value == null ? 'Required Contract End Date' : null),
      subCategory: (value) =>
        value == null ? 'Select service category' : null,
      rateCards: (value) =>
        value.length == 0 ? 'Required At Least One Location' : null,
    },
  });
  const startDate = new Date(form.values.startDate); // Make sure this is a Date
  startDate.setHours(startDate.getHours() + 24);

  const start_Date = new Date(); // Make sure this is a Date
  start_Date.setHours(startDate.getHours() - 7 * 24);

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const fetchLocationsData = () => {
      axios
        .post(Rest.viewAllServiceAreas)
        .then((res) => {
          const location = res.data.data;
          location.map((location, index) => {
            if (location.Status == 'Active') {
              const loc = {};
              loc.value = location.CityID;
              loc.label = location.CityName;
              setLocations((oldArray) => [...oldArray, loc]);
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
    const getServices = () => {
      axios
        .post(
          Rest.adminViewAllCategoriesDetails,
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
            const SubSubCategories = data.data.subsubcategories;
            const Categories = data.data.categories;
            SubSubCategories.map((service, index) => {
              if (service.CategoryID == 'AKCS1') {
                let obj = {};
                obj.value = service.SubCategoryID;
                obj.label = service.AliasName;
                setSubServicesOfferedData((oldArray) => [...oldArray, service]);
                setSubServicesOffered((oldArray) => [...oldArray, obj]);
              }
            });
            SubCategories.map((service, index) => {
              if (service.CategoryID == 'AKCS1') {
                let obj = {};
                obj.value = service.SubCategoryID;
                obj.label = service.AliasName;
                setServicesOfferedData((oldArray) => [...oldArray, service]);
                setServicesOffered((oldArray) => [...oldArray, obj]);
              }
            });
            Categories.map((category, index) => {
              let obj = {};
              obj.value = category.CategoryID;
              obj.label = category.AliasName;
              setCategoriesData((oldArray) => [...oldArray, category]);
              setCategories((oldArray) => [...oldArray, obj]);
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
    if (user.token) {
      getServices();
      fetchLocationsData();
    }
  }, [user.token]);

  const handleAddLocation = () => {
    form.insertListItem('rateCards', {
      id: ++locationId,
      location: '',
      services: [
        {
          id: ++serviceId,
          name: '',
          partnerRateMontly: 0,
          partnerRateDaily: 0,
          partnerRateOnetime: 0,
          montlyReferralPercentage: 0,
          dailyReferralPercentage: 0,
          onetimeReferralPercentage: 0,
          partnerFinalRateMontly: 0,
          partnerFinalRateDaily: 0,
          partnerFinalRateOnetime: 0,
        },
      ],
    });
  };
  const handleAddService = (idx) => {
    form.insertListItem(`rateCards.${idx}.services`, {
      id: ++serviceId,
      name: '',
      partnerRateMontly: 0,
      partnerRateDaily: 0,
      partnerRateOnetime: 0,
      montlyReferralPercentage: 0,
      dailyReferralPercentage: 0,
      onetimeReferralPercentage: 0,
      partnerFinalRateMontly: 0,
      partnerFinalRateDaily: 0,
      partnerFinalRateOnetime: 0,
    });
  };
  const handleDeleteService = (idx, serIdx) => {
    form.removeListItem(`rateCards.${idx}.services`, serIdx);
  };
  const handleDeleteLocation = (idx) => {
    form.removeListItem(`rateCards`, idx);
  };
  const saveRateCardData = async (values) => {
    const tarrifTypes = ['Monthly', 'Daily', 'OneTime'];
    try {
      if (values.referalType === 'Referral_Percentage') {
        for (const locationIdx in values.rateCards) {
          for (const serviceIdx in values.rateCards[locationIdx].services) {
            const service = values.rateCards[locationIdx].services[serviceIdx];
            if (
              +service.partnerRateMontly === 0 &&
              +service.partnerRateDaily === 0 &&
              +service.partnerRateOnetime === 0
            ) {
              form.setFieldError(
                `rateCards.${locationIdx}.services.${serviceIdx}.partnerRateMontly`,
                'Enter Monthly Rate',
              );
              form.setFieldError(
                `rateCards.${locationIdx}.services.${serviceIdx}.partnerRateDaily`,
                'Enter Daily Rate',
              );
              form.setFieldError(
                `rateCards.${locationIdx}.services.${serviceIdx}.partnerRateOnetime`,
                'Enter OneTime Rate',
              );
              return;
            }
          }
        }
      }
      if (values.referalType == 'Referral_Amount') {
        for (const locationIdx in values.rateCards) {
          for (const serviceIdx in values.rateCards[locationIdx].services) {
            const service = values.rateCards[locationIdx].services[serviceIdx];
            console.log(service);
            if (
              +service.partnerRateMontly === 0 &&
              +service.partnerRateDaily === 0 &&
              +service.partnerRateOnetime === 0
            ) {
              form.setFieldError(
                `rateCards.${locationIdx}.services.${serviceIdx}.partnerRateMontly`,
                'Enter Monthly Rate',
              );
              form.setFieldError(
                `rateCards.${locationIdx}.services.${serviceIdx}.partnerRateDaily`,
                'Enter Daily Rate',
              );
              form.setFieldError(
                `rateCards.${locationIdx}.services.${serviceIdx}.partnerRateOnetime`,
                'Enter OneTime Rate',
              );
              return;
            }
          }
        }
      }

      const finalData = [];
      values.rateCards.map((rateObj, index) => {
        rateObj.services.map((service, indexOne) => {
          tarrifTypes.map((type, indextwo) => {
            const finalObj = {};
            const i = subServicesOfferedData.findIndex(
              (obj) => obj.SubCategoryID === service.name,
            );
            if (type == 'Monthly' && service.partnerRateMontly != 0) {
              finalObj.PartnerID = vendorId;
              finalObj.ServiceAreaID = rateObj.location;
              finalObj.CategoryID = subServicesOfferedData[i].CategoryID;
              finalObj.SubCategoryID = subServicesOfferedData[i].CategoryTypeID;
              finalObj.SubSubCategoryID =
                subServicesOfferedData[i].SubCategoryID;

              finalObj.VendorPrice = parseInt(service.partnerRateMontly);
              finalObj.ReferalFee = parseInt(values.referalFee);
              finalObj.FinalPrice =
                finalObj.VendorPrice -
                finalObj.VendorPrice * (finalObj.ReferalFee / 100);
              finalObj.TarrifType = 'Monthly';

              finalObj.MinimumPrice = 0;
              finalObj.ReferalType = values.referalType;

              const startDate = new Date(values.startDate);
              const day = startDate.getDate().toString().padStart(2, '0');
              const month = (startDate.getMonth() + 1)
                .toString()
                .padStart(2, '0');
              const year = startDate.getFullYear().toString();

              const endDate = new Date(values.endDate);
              const endDay = endDate.getDate().toString().padStart(2, '0');
              const endMonth = (endDate.getMonth() + 1)
                .toString()
                .padStart(2, '0');
              const endYear = endDate.getFullYear().toString();

              const formattedStartDate = `${day}-${month}-${year}`;
              const formattedEndDate = `${endDay}-${endMonth}-${endYear}`;

              finalObj.StartDate = formattedStartDate;
              finalObj.EndDate = formattedEndDate;
              finalData.push(finalObj);
            }
            if (type == 'Daily' && service.partnerRateDaily != 0) {
              finalObj.PartnerID = vendorId;
              finalObj.ServiceAreaID = rateObj.location;
              finalObj.CategoryID = subServicesOfferedData[i].CategoryID;
              finalObj.SubCategoryID = subServicesOfferedData[i].CategoryTypeID;
              finalObj.SubSubCategoryID =
                subServicesOfferedData[i].SubCategoryID;

              finalObj.VendorPrice = parseInt(service.partnerRateDaily);
              finalObj.ReferalFee = parseInt(values.referalFee);
              finalObj.FinalPrice =
                finalObj.VendorPrice -
                finalObj.VendorPrice * (finalObj.ReferalFee / 100);
              finalObj.TarrifType = 'Daily';

              finalObj.MinimumPrice = 0;
              finalObj.ReferalType = values.referalType;

              const startDate = new Date(values.startDate);
              const day = startDate.getDate().toString().padStart(2, '0');
              const month = (startDate.getMonth() + 1)
                .toString()
                .padStart(2, '0');
              const year = startDate.getFullYear().toString();

              const endDate = new Date(values.endDate);
              const endDay = endDate.getDate().toString().padStart(2, '0');
              const endMonth = (endDate.getMonth() + 1)
                .toString()
                .padStart(2, '0');
              const endYear = endDate.getFullYear().toString();

              const formattedStartDate = `${day}-${month}-${year}`;
              const formattedEndDate = `${endDay}-${endMonth}-${endYear}`;

              finalObj.StartDate = formattedStartDate;
              finalObj.EndDate = formattedEndDate;
              finalData.push(finalObj);
            }
            if (type == 'OneTime' && service.partnerRateOnetime != 0) {
              finalObj.PartnerID = vendorId;
              finalObj.ServiceAreaID = rateObj.location;
              finalObj.CategoryID = subServicesOfferedData[i].CategoryID;
              finalObj.SubCategoryID = subServicesOfferedData[i].CategoryTypeID;
              finalObj.SubSubCategoryID =
                subServicesOfferedData[i].SubCategoryID;

              finalObj.VendorPrice = parseInt(service.partnerRateOnetime);
              finalObj.ReferalFee = parseInt(values.referalFee);
              finalObj.FinalPrice =
                finalObj.VendorPrice -
                finalObj.VendorPrice * (finalObj.ReferalFee / 100);
              finalObj.TarrifType = 'OneTime';

              finalObj.MinimumPrice = 0;
              finalObj.ReferalType = values.referalType;

              const startDate = new Date(values.startDate);
              const day = startDate.getDate().toString().padStart(2, '0');
              const month = (startDate.getMonth() + 1)
                .toString()
                .padStart(2, '0');
              const year = startDate.getFullYear().toString();

              const endDate = new Date(values.endDate);
              const endDay = endDate.getDate().toString().padStart(2, '0');
              const endMonth = (endDate.getMonth() + 1)
                .toString()
                .padStart(2, '0');
              const endYear = endDate.getFullYear().toString();

              const formattedStartDate = `${day}-${month}-${year}`;
              const formattedEndDate = `${endDay}-${endMonth}-${endYear}`;

              finalObj.StartDate = formattedStartDate;
              finalObj.EndDate = formattedEndDate;
              finalData.push(finalObj);
            }
          });
        });
      });

      axios
        .post(Rest.createContract, finalData, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code == 'S001') {
            setStatus(STATUS_ENUM.SUCCESS);
            alert(data.data);
            router.push(`/admin/partners/${vendorId}`);
          } else {
            setStatus(STATUS_ENUM.ERROR);
            alert(data.data);
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
    } catch (e) {
      alert(e.message);
      setStatus(STATUS_ENUM.ERROR);
    }
  };
  const renderLocations = (idx, form) => {
    return (
      <Select
        label="Select Location"
        required
        searchable
        nothingFound="No options"
        placeholder="Select Location"
        data={locations}
        name={`rateCards.${idx}.location`}
        {...form.getInputProps(`rateCards.${idx}.location`)}
      />
    );
  };

  return (
    <section>
      <CustomTitle title="Initiate Contract" />
      <form onSubmit={form.onSubmit(saveRateCardData)}>
        <Group position="apart" grow mt={10}>
          <DatePickerInput
            minDate={start_Date}
            valueFormat="DD-MM-YYYY"
            label="Start date"
            required
            placeholder="Contract start date"
            withAsterisk
            {...form.getInputProps('startDate')}
          />
          <DatePickerInput
            valueFormat="DD-MM-YYYY"
            label="End date"
            minDate={startDate}
            placeholder="Contract end date"
            required
            withAsterisk
            {...form.getInputProps('endDate')}
          />

          <Select
            label="Service Category"
            placeholder="Select service category"
            required
            data={servicesOffered}
            name={'subCategory'}
            {...form.getInputProps('subCategory')}
          />
          <Select
            label="Referal type"
            placeholder="Select referal type"
            required
            data={[
              { value: 'Referral_Amount', label: 'Flat Rate' },
              {
                value: 'Referral_Percentage',
                label: 'Percentage',
              },
            ]}
            name={'referalType'}
            {...form.getInputProps('referalType')}
          />

          {form.values.referalType != 'Referral_Percentage' ? null : (
            <NumberInput
              label="Percentage"
              required
              max={100}
              min={0}
              defaultValue={0}
              placeholder="Enter Percentage"
              name={`referalFee`}
              {...form.getInputProps(`referalFee`)}
            />
          )}
        </Group>

        <Accordion
          mt={20}
          variant="separated"
          chevronPosition="left"
          defaultValue="item-0"
        >
          {form.values.rateCards.map((value, idx) => (
            <Accordion.Item key={value.id} value={`item-${idx}`}>
              <AccordionControl
                showActionButton={form.values.rateCards.length != 1}
                onDelete={() => handleDeleteLocation(idx)}
              >
                Location {idx + 1}:
              </AccordionControl>
              <Accordion.Panel>
                {renderLocations(idx, form)}
                <AddRateCard
                  value={value}
                  idx={idx}
                  form={form}
                  serviceId={'AKCS1'}
                  subCategoryID={form.values.subCategory}
                  onDelete={handleDeleteService}
                  initialValues={initialValues}
                />
                <Button
                  mt="sm"
                  variant="light"
                  onClick={() => handleAddService(idx)}
                >
                  Add One More Service
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <Stack align="center">
          <Button mt="sm" variant="outline" onClick={handleAddLocation}>
            Add One More Location
          </Button>
          <Group position="apart" display={'none'}>
            <Text weight={500}>Signature:</Text>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <SignatureCanvas
                  ref={signRef}
                  canvasProps={{
                    width: 300,
                    height: 100,
                    className: 'sigCanvas',
                  }}
                />
              </Card.Section>
              <Button
                onClick={() => signRef.current.clear()}
                variant="light"
                radius="md"
              >
                Clear
              </Button>
            </Card>
          </Group>
          <Button type="submit" mt="sm">
            Submit
          </Button>
        </Stack>
      </form>
    </section>
  );
};

InitiateContract.getLayout = function getLayout(page) {
  return <AdminProtectedLayout>{page}</AdminProtectedLayout>;
};
export default InitiateContract;
