const formData = {
  initialValues: {
    companyName: '',
    businessNature: '',
    companyWebsite: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    //title: '',
    name: '',
    //lastName: '',
    email: '',
  },
  validate: {
    companyName: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'Company name is required',
    businessNature: (value) =>
      value.trim().length > 0 ? null : 'Company Type is required',
    address: (value) =>
      value.trim().length > 0 ? null : 'Address is required',
    landmark: (value) =>
      value.trim().length > 0 && value.trim().length < 50
        ? null
        : 'landmark is required',
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

    name: (value) =>
      value.trim().length > 0 && value.trim().length < 30
        ? null
        : 'First Name is required',
    // lastName: (value) =>
    //   value.trim().length > 0 && value.trim().length < 30
    //     ? null
    //     : 'Last Name is required',
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
        name: 'businessNature',
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
        label: 'Address',
        placeholder: 'Address',
        withAsterisk: true,
        name: 'address',
      },
    },
    {
      component: 'TextInput',
      props: {
        label: 'Landmark',
        placeholder: 'Landmark',
        withAsterisk: true,
        name: 'landmark',
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
    //       { value: 'Mr', label: 'Mr' },
    //       { value: 'Ms', label: 'Ms' },
    //       { value: 'Mrs', label: 'Mrs' },
    //       { value: 'Dr', label: 'Dr' },
    //     ],
    //   },
    // },
    {
      component: 'TextInput',
      props: {
        label: 'Name',
        placeholder: 'Contact Name',
        withAsterisk: true,
        name: 'name',
      },
    },
    // {
    //   component: 'TextInput',
    //   props: {
    //     label: 'Last Name',
    //     placeholder: 'Last Name',
    //     withAsterisk: true,
    //     name: 'lastName',
    //   },
    // },
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
