import { rem } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

const formData = {
  initialValues: {
    pan: '',
    panDoc: null,
    gstin: '',
    gstDoc: null,
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    businessStartDate: null,
    businessRegDoc: null,
    ifscCode: '',
    bankBranch: '',
    bankAddress: '',
    bankCity: '',
    bankState: '',
    bankPincode: '',
    bankAccountType: '',
    cancelledCheck: null,
  },
  validate: {
    businessStartDate: (value) =>
      value != null ? null : 'Business Start Date is required',
    businessRegDoc: (value) =>
      value != null ? null : 'Business Registration Document is required',
    pan: (value) =>
      /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/.test(value)
        ? null
        : 'Pan is required',
    panDoc: (value) => (value != null ? null : 'PAN card document is required'),
    // gstin: (value) =>
    //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)
    //     ? null
    //     : 'GSTIN is required',
    //gstDoc: (value) => (value != null ? null : 'GST copy document is required'),
    bankName: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Bank Name is required',
    accountHolderName: (value) =>
      value.trim().length > 0 && value.trim().length < 150
        ? null
        : 'Bank Name is required',
    accountNumber: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Account Number is required',
    confirmAccountNumber: (value, values) =>
      value !== values.accountNumber ? 'Account Number did not match' : null,
    ifscCode: (value) =>
      /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value) ? null : 'IFSC Code is required',
    bankBranch: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Bank Branch is required',
    bankAddress: (value) =>
      value.trim().length > 0 && value.trim().length < 200
        ? null
        : 'Bank Address is required',
    bankCity: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Bank City is required',
    bankState: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Bank State is required',
    bankPincode: (value) =>
      /^[1-9][0-9]{5}$/.test(value) ? null : 'Bank Pincode is required',
    bankAccountType: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Bank Account Type is required',

    cancelledCheck: (value) =>
      value != null ? null : 'Cancelled check or Passbook document is required',
  },
  render: [
    {
      component: 'DateInput',
      props: {
        name: 'businessStartDate',
        label: 'Business Start Date',
        placeholder: 'Enter Business Start Date',
        withAsterisk: true,
        minDate: new Date(),
      },
    },
    {
      component: 'FileInput',
      props: {
        name: 'businessRegDoc',
        label: 'Business Registration Document',
        placeholder: 'Upload Business Registration Document',
        withAsterisk: true,
        icon: <IconUpload size={rem(14)} />,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'pan',
        label: 'PAN',
        placeholder: 'Enter PAN',
        withAsterisk: true,
      },
    },
    {
      component: 'FileInput',
      props: {
        name: 'panDoc',
        label: 'PAN Card Document',
        placeholder: 'Upload PAN Card Document',
        withAsterisk: true,
        icon: <IconUpload size={rem(14)} />,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'gstin',
        label: 'GSTIN',
        placeholder: 'Enter GSTIN',
      },
    },
    {
      component: 'FileInput',
      props: {
        name: 'gstDoc',
        label: 'GSTIN Copy Document',
        placeholder: 'Upload GSTIN Copy Document',
        icon: <IconUpload size={rem(14)} />,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'bankName',
        label: 'Bank Name',
        placeholder: 'Enter Bank Name',
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'accountHolderName',
        label: 'Account Holder Name',
        placeholder: 'Enter Account Number Name',
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        type: 'password',
        name: 'accountNumber',
        label: 'Account Number',
        placeholder: 'Enter Account Number',
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'confirmAccountNumber',
        label: 'Confirm Account Number',
        placeholder: 'Confirm Account Number',
        withAsterisk: true,
      },
    },
    {
      component: 'Select',
      props: {
        name: 'bankAccountType',
        label: 'Bank Account Type',
        placeholder: 'Enter Bank Account Type',
        data: [],
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'ifscCode',
        label: 'IFSC Code',
        placeholder: 'Enter IFSC Code',
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'bankBranch',
        label: 'Bank Branch',
        placeholder: 'Enter Bank Branch',
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'bankAddress',
        label: 'Bank Address',
        placeholder: 'Enter Bank Address',
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'bankCity',
        label: 'Bank City',
        placeholder: 'Enter Bank City',
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'bankState',
        label: 'Bank State',
        placeholder: 'Enter Bank State',
        withAsterisk: true,
      },
    },
    {
      component: 'TextInput',
      props: {
        name: 'bankPincode',
        label: 'Bank Pincode',
        placeholder: 'Enter Bank Pincode',
        withAsterisk: true,
      },
    },
    {
      component: 'FileInput',
      props: {
        name: 'cancelledCheck',
        label: 'Copy of Cancelled check or Pass book',
        placeholder: 'Upload Cancelled check or Pass book',
        withAsterisk: true,
        icon: <IconUpload size={rem(14)} />,
      },
    },
  ],
};

export default formData;
