import { useForm } from '@mantine/form';
import { useState } from 'react';
import {
  Modal,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  Select,
  Text,
} from '@mantine/core';

const tariffTypes = [
  { value: '12 hours', label: '12 hours' },
  { value: 'Daily', label: 'Daily' },
  { value: 'Monthly', label: 'Monthly' },
];

const referalTypes = [
  {
    value: 'Referal_Percentage',
    label: 'Referal_Percentage',
  },
  { value: 'Referral_Fee', label: 'Referral_Fee' },
];
const UpdateRateCard = ({ data, close, onSubmit }) => {
  const initialValues = {
    partnerPrice: data.VendorPrice,
    minPrice: data.MinimumPrice,
    tarrifType: data.TarrifType,
    referalType: data.ReferalType,
    referalFee: data.ReferalFee,
    categoryID: data.CategoryID,
    contractID: data.ContractID,
    partnerID: data.PartnerID,
    serviceAreaID: data.ServiceAreaID,
    subCategoryID: data.SubCategoryID,
    subSubCategoryID: data.SubSubCategoryID,
  };
  const form = useForm({
    initialValues,
    validate: {
      partnerPrice: (value) =>
        value == undefined || value.length < 1 ? 'Required PAN number' : null,
      // minPrice: (value) =>
      //   value == undefined || value.length < 1 ? 'Required GST number' : null,
      // tarrifType: (value) =>
      //   value == undefined || value.trim().length < 1
      //     ? 'Required Bank name'
      //     : null,
      // referalType: (value) =>
      //   value == undefined || value.trim().length < 1
      //     ? 'Required Account number'
      //     : null,
      // referalFee: (value) =>
      //   value == undefined || value.length < 1
      //     ? 'Required account holder name'
      //     : null,
    },
  });

  return (
    <Modal opened onClose={close} title="Update rate card" centered>
      <SimpleGrid>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Text>
            <b>Service</b> : {data.ServiceDetails.AliasName}
          </Text>
          <Text>
            <b>Location</b> : {data.ServiceAreaDetails.CityName}
          </Text>

          <br></br>
          <TextInput
            placeholder="Partner Price"
            label="Partner Price"
            withAsterisk
            type="Number"
            name="partnerPrice"
            {...form.getInputProps('partnerPrice')}
          />

          {/* <TextInput
            label="Min Price"
            placeholder="Min Price"
            withAsterisk
            type="Number"
            name="minPrice"
            {...form.getInputProps('minPrice')}
          />

          <Select
            placeholder="Tarrif Type"
            label="Tarrif Type"
            withAsterisk
            name="tarrifType"
            data={tariffTypes}
            {...form.getInputProps('tarrifType')}
          />
          <Select
            placeholder="Referal Type"
            label="Referal Type"
            withAsterisk
            name="referalType"
            data={referalTypes}
            {...form.getInputProps('referalType')}
          />
          <TextInput
            placeholder="Referal Fee"
            label="Referal Fee"
            withAsterisk
            type="Number"
            name="referalFee"
            {...form.getInputProps('referalFee')}
          /> */}

          <Group mt={10} position="apart" grow>
            <Button type="submit">Update</Button>
          </Group>
        </form>
      </SimpleGrid>
    </Modal>
  );
};

export default UpdateRateCard;
