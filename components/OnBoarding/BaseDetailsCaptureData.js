const formData = {
  initialValues: {
    companyName: '',
    companyType: '',
    companyWebsite: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    //title: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  validate: {
    companyName: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Company name is required',
    companyType: (value) =>
      value.trim().length > 0 ? null : 'Company Type is required',
    addressLine1: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Address Line 1 is required',
    addressLine2: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Address Line 2 is required',
    city: (value) =>
      value.trim().length > 0 && value.trim().length < 30
        ? null
        : 'City is required',
    state: (value) =>
      value.trim().length > 0 && value.trim().length < 30
        ? null
        : 'State is required',
    pincode: (value) =>
      value.trim().length != 6 ? 'Pincode is required' : null,
    // title: (value) =>
    //   value.trim().length > 0 && value.trim().length < 15
    //     ? null
    //     : 'Title is required',
    firstName: (value) =>
      value.trim().length > 0 && value.trim().length < 30
        ? null
        : 'First Name is required',
    lastName: (value) =>
      value.trim().length > 0 && value.trim().length < 30
        ? null
        : 'Last Name is required',
    email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  },
  render: [
    {
      component: 'TitleDivider',
      props: {
        label: 'Company Details',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'Company Name',
        placeholder: 'Company Name',
        withAsterisk: true,
        name: 'companyName',
      },
    },
    {
      component: 'Select',
      props: {
        label: 'Company Type',
        placeholder: 'Choose One',
        withAsterisk: true,
        name: 'companyType',
        data: [],
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'Company Website',
        placeholder: 'Company Website',
        name: 'companyWebsite',
      },
    },
    {
      component: 'TitleDivider',
      props: {
        label: 'Company Address',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'Address Line 1',
        placeholder: 'Address Line 1',
        withAsterisk: true,
        name: 'addressLine1',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'Address Line 2',
        placeholder: 'Address Line 2',
        withAsterisk: true,
        name: 'addressLine2',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'City',
        placeholder: 'City',
        withAsterisk: true,
        name: 'city',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'State',
        placeholder: 'State',
        withAsterisk: true,
        name: 'state',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'Pincode',
        placeholder: 'Pincode',
        withAsterisk: true,
        name: 'pincode',
      },
    },
    {
      component: 'TitleDivider',
      props: {
        label: 'Contact Person Details',
      },
    },
    // {
    //   component: 'Select',
    //   props: {
    //     label: 'Title',
    //     placeholder: 'Choose One',
    //     withAsterisk: true,
    //     name: 'title',
    //     data: [
    //       { value: 'MR', label: 'Mr' },
    //       { value: 'MS', label: 'Ms' },
    //       { value: 'MRS', label: 'Mrs' },
    //       { value: 'DR', label: 'Dr' },
    //     ],
    //   },
    // },
    {
      component: 'TextInput',
      props: {
        label: 'First Name',
        placeholder: 'First Name',
        withAsterisk: true,
        name: 'firstName',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'Last Name',
        placeholder: 'Last Name',
        withAsterisk: true,
        name: 'lastName',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'Email',
        description:
          'Please enter an email that you check regularly as we will send all communication here.',
        placeholder: 'Email',
        withAsterisk: true,
        name: 'email',
      },
    },
  ],
};

export default formData;
