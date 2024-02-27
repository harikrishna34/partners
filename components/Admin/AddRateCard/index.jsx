import { Accordion, Text, Grid } from '@mantine/core';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '@/context/Auth';
import axios from 'axios';
import * as Rest from '@/data/restapi';
import AddFeeGrids from '../AddFeeGrids';
import AddPercentageGrids from '../AddPercentageGrids';

const AddRateCard = ({
  value,
  idx,
  form,
  serviceId,
  subCategoryID,
  onDelete,
  initialValues,
}) => {
  const { user } = useContext(AuthContext);
  const [servicesOffered, setServicesOffered] = useState([]);
  useEffect(() => {
    const getServices = () => {
      setServicesOffered([]);
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
            const SubCategories = data.data.subsubcategories;
            SubCategories.map((service) => {
              //if (service.CategoryID == serviceId) {
              if (service.CategoryTypeID == subCategoryID) {
                let obj = {};
                obj.value = service.SubCategoryID;
                obj.label = service.AliasName;
                setServicesOffered((oldArray) => [...oldArray, obj]);
              }
            });
          } else {
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.data) {
            alert(err.response.data.data);
          } else {
            alert(err.message);
          }
        });
    };
    if (user.token) {
      getServices();
    }
  }, [user.token, serviceId, subCategoryID]);

  return (
    <Accordion
      mt={20}
      variant="separated"
      chevronPosition="left"
      defaultValue="item-0"
    >
      {form.values.referalType == 'Referral_Amount' && (
        <Grid justify="center" align="center" grow mt="10px">
          <Grid.Col span={2}></Grid.Col>
          <Grid.Col span={3}>
            <Text fw={500} ml={60}>
              Partner Proposed Rates
            </Text>
          </Grid.Col>
        </Grid>
      )}{' '}
      {form.values.referalType == 'Referral_Percentage' && (
        <Grid justify="center" align="center" grow mt="10px">
          <Grid.Col span={2}></Grid.Col>
          <Grid.Col span={3}>
            <Text fw={500} ml={60}>
              Partner Proposed Rates
            </Text>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text fw={500} ml={60}>
              Partner Final Rates
            </Text>
          </Grid.Col>
        </Grid>
      )}
      {value.services.map((serVal, serIdx) => {
        if (form.values.referalType == 'Referral_Amount')
          return (
            <AddFeeGrids
              key={serIdx}
              value={value}
              idx={idx}
              serVal={serVal}
              serIdx={serIdx}
              form={form}
              servicesOffered={servicesOffered}
              onDelete={onDelete}
              initialValues={initialValues}
            />
          );

        if (form.values.referalType == 'Referral_Percentage')
          return (
            <AddPercentageGrids
              key={serIdx}
              value={value}
              idx={idx}
              serVal={serVal}
              serIdx={serIdx}
              form={form}
              servicesOffered={servicesOffered}
              onDelete={onDelete}
            />
          );
      })}
    </Accordion>
  );
};

export default AddRateCard;
