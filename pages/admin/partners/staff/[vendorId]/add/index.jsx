import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingOverlay } from '@mantine/core';

import ProtectedLayout from '@/layouts/ProtectedLayout';
import CustomTitle from '@/components/CustomTitle';
import { AddStaff } from '@/components/Staff';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
import axios from 'axios';
import AdminProtectedLayout from '@/layouts/AdminProtectedLayout';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const AddAdminStaffPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const [locations, setLocations] = useState([]);
  const [homeHealthServicesOffered, setHomeHealthServicesOffered] = useState(
    [],
  );

  const { vendorId } = router.query;
  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
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
            SubCategories.map((service, index) => {
              let obj = {};
              obj.value = service.SubCategoryID;
              obj.label = service.AliasName;
              setHomeHealthServicesOffered((oldArray) => [...oldArray, obj]);
            });
            setStatus(STATUS_ENUM.SUCCESS);
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
    if (user.token) {
      fetchLocationsData();
      getServices();
    }
  }, [user.token]);

  const handleAdd = async (data) => {
    console.log(data, '...........................');
    try {
      const indexone = locations.findIndex(
        (obj) => obj.value == data.locations,
      );
      const indextwo = homeHealthServicesOffered.findIndex(
        (obj) => obj.value == data.homeHealthServicesOffered,
      );
      const formData = new FormData();
      var index = data.docsSubmitted.findIndex((obj) => obj.name == 'AADHAR');
      if (index > -1) {
        formData.append('AdharCardimg', data.docsSubmitted[index].file);
      }
      formData.append('ProfileImg', data.ProfileImg);
      formData.append('PartnerID', user.partnerID);
      formData.append('Name', data.name);
      formData.append('SubcategoryID', data.homeHealthServicesOffered);
      formData.append(
        'SubcategoryName',
        homeHealthServicesOffered[indextwo].label,
      );
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
      for (let nestedKey in data.langSpoken) {
        formData.append(`Languages[${nestedKey}]`, data.langSpoken[nestedKey]);
      }

      try {
        const response = await axios.post(Rest.createStaff, formData, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        });
        if (response && response.data.code == 'S001') {
          alert(response.data.data);
          router.push('/staff');
        } else {
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
      alert(e.message);
    }
  };

  const initialValues = {
    name: '',
    age: 0,
    gender: '',
    education: '',
    aadhaarNo: '',
    line1: '',
    email: '',
    phone: '',
    homeHealthServicesOffered: [],
    religion: '',
    locations: '',
    langSpoken: '',
    experience: '',
    additionalInfo: '',
    ProfileImg: '',
    docsSubmitted: [
      {
        name: '',
        file: {},
      },
    ],
  };

  return (
    <section style={{ position: 'relative' }}>
      <LoadingOverlay visible={status == STATUS_ENUM.LOADING} overlayBlur={2} />
      <CustomTitle title="Add Staff" />
      <AddStaff
        intialValues={initialValues}
        serviceID="AMBULANCE_SERVICE"
        location={locations}
        services={homeHealthServicesOffered}
        onCancel={() => router.back()}
        onAdd={handleAdd}
      />
    </section>
  );
};

AddAdminStaffPage.getLayout = function getLayout(page) {
  return <AdminProtectedLayout>{page}</AdminProtectedLayout>;
};

export default AddAdminStaffPage;
