const formData = {
  AMBULANCE_SERVICE: {
    initialValues: {
      name: '',
      age: 0,
      gender: '',
      education: '',
      aadhaarNo: '',
      line1: '',
      // line2: '',
      // city: '',
      // state: '',
      // pincode: '',
      email: '',
      phone: '',
      homeHealthServicesOffered: '',
      religion: [],
      locations: [],
      langSpoken: [],
      experience: 0,
      additionalInfo: '',
    },
    validate: {
      name: (value) =>
        value.trim().length > 0 && value.trim().length < 30
          ? null
          : 'First Name is required',
      age: (value) => (value >= 0 ? null : 'Age is required'),

      gender: (value) =>
        value.trim().length > 0 && value.trim().length < 30
          ? null
          : 'Gender is required',
      education: (value) =>
        value.trim().length > 0 && value.trim().length < 30
          ? null
          : 'Education is required',
      aadhaarNo: (value) =>
        /^\d{12}$/.test(value) ? null : 'Aadhaar number is required',
      line1: (value) =>
        value.trim().length > 0 ? null : 'Address Line 1 is required',
      // line2: (value) =>
      //   value.trim().length > 0 ? null : 'Address Line 2 is required',
      // city: (value) =>
      //   value.trim().length > 0 && value.trim().length < 130
      //     ? null
      //     : 'City is required',
      // state: (value) =>
      //   value.trim().length > 0 && value.trim().length < 30
      //     ? null
      //     : 'State is required',
      // pincode: (value) =>
      //   /^[1-9][0-9]{5}$/.test(value) ? null : 'Bank Pincode is required',
      // phone: (value) =>
      //   value.trim().length == 10 ? null : 'Phone with 10 digits is required',
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      homeHealthServicesOffered: (value) =>
        value.length > 0 ? null : 'Services is required',
      religion: (value) => (value.length > 0 ? null : 'Religion is required'),
      locations: (value) =>
        value.length > 0 ? null : 'Location Spoken is required',
      langSpoken: (value) =>
        value.length > 0 ? null : 'Language Spoken is required',
      experience: (value) => (value >= 0 ? null : 'Experience is required'),
    },
    render: [
      {
        component: 'TitleDivider',
        props: {
          label: 'Member Details',
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Name',
          placeholder: 'Name',
          withAsterisk: true,
          name: 'name',
        },
      },
      {
        component: 'NumberInput',
        props: {
          label: 'Age',
          placeholder: 'Age',
          withAsterisk: true,
          name: 'age',
        },
      },

      {
        component: 'Select',
        props: {
          label: 'Gender',
          placeholder: 'Selcet Gender',
          withAsterisk: true,
          name: 'gender',
          data: [],
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Education',
          placeholder: 'Education',
          withAsterisk: true,
          name: 'education',
        },
      },
      {
        component: 'NumberInput',
        props: {
          label: 'Aadhaar Number',
          placeholder: 'Aadhaar Number',
          withAsterisk: true,
          name: 'aadhaarNo',
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Phone',
          placeholder: 'Phone',
          name: 'phone',
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Email',
          placeholder: 'Email',
          name: 'email',
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Address',
          placeholder: 'Address',
          withAsterisk: true,
          name: 'line1',
        },
      },
      // {
      //   component: 'TextInput',
      //   props: {
      //     label: 'Address Line 2',
      //     placeholder: 'Address Line 2',
      //     withAsterisk: true,
      //     name: 'line2',
      //   },
      // },
      // {
      //   component: 'TextInput',
      //   props: {
      //     label: 'City',
      //     placeholder: 'City',
      //     withAsterisk: true,
      //     name: 'city',
      //   },
      // },
      // {
      //   component: 'TextInput',
      //   props: {
      //     label: 'State',
      //     placeholder: 'State',
      //     withAsterisk: true,
      //     name: 'state',
      //   },
      // },
      // {
      //   component: 'TextInput',
      //   props: {
      //     label: 'Pincode',
      //     placeholder: 'Pincode',
      //     withAsterisk: true,
      //     name: 'pincode',
      //   },
      // },
      {
        component: 'TitleDivider',
        props: {
          label: 'Member Skills',
        },
      },
      {
        component: 'Select',
        props: {
          label: 'Slelct Service',
          placeholder: 'Selcet Service',
          withAsterisk: true,
          name: 'homeHealthServicesOffered',
          data: [],
        },
      },
      {
        component: 'Select',
        props: {
          label: 'Slelct Religion',
          placeholder: 'Selcet Religion',
          withAsterisk: true,
          name: 'religion',
          data: [],
        },
      },
      {
        component: 'Select',
        props: {
          label: 'Slelct Locations',
          placeholder: 'Selcet Locations',
          withAsterisk: true,
          name: 'locations',
          data: [],
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Languages Spoken',
          placeholder: 'Languages Spoken',
          withAsterisk: true,
          name: 'langSpoken',
          data: [],
        },
      },
      {
        component: 'NumberInput',
        props: {
          label: 'Experience',
          placeholder: 'Experience',
          withAsterisk: true,
          name: 'experience',
        },
      },
    ],
  },
  HOME_HEALTH_CARE: {},
  DAILY_ASSISTANCE: {},
  OTHER_SERVICE: {},
};

export default formData;
