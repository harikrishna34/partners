import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoadingOverlay } from '@mantine/core';
import { Skeleton } from '@mantine/core';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import CustomTitle from '@/components/CustomTitle';
import { AddStaff } from '@/components/Staff';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
import axios from 'axios';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const UpdateStaffPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const { staffId } = router.query;
  const [staffData, setStaffData] = useState({});
  const [locations, setLocations] = useState([]);
  const [homeHealthServicesOffered, setHomeHealthServicesOffered] = useState(
    [],
  );
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
              let obj = {};
              //obj.value = service.SubCategoryID;
              obj.value = service.SubCategoryID;
              obj.label = service.AliasName;
              setHomeHealthServicesOffered((oldArray) => [...oldArray, obj]);
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
    const getStaffDetails = () => {
      axios
        .get(Rest.viewStaffByID, {
          params: {
            ProfileID: staffId,
          },
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code == 'S001') {
            setStaffData(data.data);
            setStatus(STATUS_ENUM.SUCCESS);
          } else {
            alert(data.data);
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
    if (user.token && staffId) {
      fetchLocationsData();
      getStaffDetails();
      getServices();
    }
  }, [user.token, staffId]);

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
  // if (status != STATUS_ENUM.LOADING) {
  //   return;
  // }

  const initialValues = {
    name: staffData.Name,
    homeHealthServicesOffered: staffData.SubcategoryID,
    age: parseInt(staffData.Age),
    gender: staffData.Gender,
    education: staffData.Education,
    aadhaarNo: parseInt(staffData.AadhaarNo),
    line1: staffData.Address,
    email: staffData.EmailID,
    phone: staffData.MobileNumber,
    religion: staffData.Religion,
    locations: staffData.ServiceAreaID,
    langSpoken: staffData.Languages,
    experience: parseInt(staffData.Experience),
    additionalInfo: '',
    ProfileImg:
      staffData && staffData.ProfileImage && staffData.ProfileImage.ProfileImg,
    docsSubmitted: [
      {
        name: 'AADHAR',
        file: {},
      },
    ],
  };

  const handleAdd = async (data) => {
    try {
      const indexone = locations.findIndex(
        (obj) => obj.value == data.locations,
      );

      const indextwo = homeHealthServicesOffered.findIndex(
        (obj) => obj.value == data.homeHealthServicesOffered,
      );
      setStatus(STATUS_ENUM.LOADING);
      const formData = new FormData();
      const index = data.docsSubmitted.findIndex((obj) => obj.name == 'AADHAR');
      if (index > -1) {
        formData.append('AdharCardimg', data.docsSubmitted[index].file);
      }
      formData.append('ProfileImg', data.ProfileImg);
      formData.append('ProfileID', staffId);
      formData.append('PartnerID', user.partnerID);
      formData.append('SubcategoryID', data.homeHealthServicesOffered);
      formData.append(
        'SubcategoryName',
        homeHealthServicesOffered[indextwo].label,
      );
      formData.append('Name', data.name);
      formData.append('Age', data.age);
      formData.append('Gender', data.gender);
      formData.append('Experience', data.experience);
      formData.append('Education', data.education);
      formData.append('EmailID', data.email);
      formData.append('Address', data.line1);
      formData.append('AadhaarNo', data.aadhaarNo);
      formData.append('MobileNumber', data.phone);
      formData.append('ServiceAreaID', data.locations);
      formData.append('ServiceAreaName', locations[indexone].label);
      formData.append('Religion', data.religion);
      //formData.append('Languages', data.langSpoken);
      for (let nestedKey in data.langSpoken) {
        formData.append(`Languages[${nestedKey}]`, data.langSpoken[nestedKey]);
      }

      try {
        const response = await axios.post(Rest.updateStaff, formData, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        });
        if (response && response.data.code == 'S001') {
          setStatus(STATUS_ENUM.SUCCESS);
          router.push('/staff');
        } else {
          setStatus(STATUS_ENUM.ERROR);
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
      setStatus(STATUS_ENUM.ERROR);
      alert(e.message);
    }
  };

  return (
    <section style={{ position: 'relative' }}>
      <LoadingOverlay visible={status == STATUS_ENUM.LOADING} overlayBlur={2} />
      <CustomTitle title="Update Staff" />
      <AddStaff
        initialValues={initialValues}
        serviceID="AMBULANCE_SERVICE"
        location={locations}
        services={homeHealthServicesOffered}
        onCancel={() => router.back()}
        onAdd={handleAdd}
      />
    </section>
  );
};

UpdateStaffPage.getLayout = function getLayout(page) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export default UpdateStaffPage;
