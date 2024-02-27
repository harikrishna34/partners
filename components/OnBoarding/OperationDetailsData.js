import axios from 'axios';
import * as Rest from '@/data/restapi';

const formData = {
  AMBULANCE_SERVICE: {
    initialValues: {
      numOfAmbulatory: 0,
      numOfParamedics: 0,
      numOfBLSVehicles: 0,
      numOfALSVehicles: 0,
      numOfDrivers: 0,
    },
    validate: {
      numOfAmbulatory: (value) => (value >= 0 ? null : 'Invalid value'),
      numOfParamedics: (value) => (value >= 0 ? null : 'Invalid value'),
      numOfBLSVehicles: (value) => (value >= 0 ? null : 'Invalid value'),
      numOfALSVehicles: (value) => (value >= 0 ? null : 'Invalid value'),
      numOfDrivers: (value) => (value >= 0 ? null : 'Invalid value'),
    },
    render: [
      {
        component: 'TitleDivider',
        props: {
          label: 'Operation Details',
        },
      },
      {
        component: 'NumberInput',
        props: {
          label: 'Number of Ambulances',
          placeholder: 'Number of Ambulances',
          withAsterisk: true,
          name: 'numOfAmbulatory',
          min: 0,
        },
      },
      {
        component: 'NumberInput',
        props: {
          label: 'Number of Basic Life Support Vehicles',
          placeholder: 'Number of Basic Life Support Vehicles',
          withAsterisk: true,
          name: 'numOfBLSVehicles',
          min: 0,
        },
      },
      {
        component: 'NumberInput',
        props: {
          label: 'Number of Advanced Life Support Vehicles',
          placeholder: 'Number of Advanced Life Support Vehicles',
          withAsterisk: true,
          name: 'numOfALSVehicles',
          min: 0,
        },
      },
      {
        component: 'NumberInput',
        props: {
          label: 'Number of Paramedics',
          placeholder: 'Number of Paramedics',
          withAsterisk: true,
          name: 'numOfParamedics',
          min: 0,
        },
      },
      {
        component: 'NumberInput',
        props: {
          label: 'Number of Drivers',
          placeholder: 'Number of Drivers',
          withAsterisk: true,
          name: 'numOfDrivers',
          min: 0,
        },
      },
    ],
  },
  HOME_HEALTH_CARE: {
    initialValues: {
      homeHealthServicesOffered: [],
      otherHomeHealthSerivces: '',
      langSpoken: [],
      otherLang: '',
      areaOfOperations: [],
    },
    validate: {
      homeHealthServicesOffered: (value) =>
        value.length > 0 ? null : 'Invalid value',
      langSpoken: (value) => (value.length > 0 ? null : 'Invalid value'),
      areaOfOperations: (value) => (value.length > 0 ? null : 'Invalid value'),
    },
    render: [
      {
        component: 'TitleDivider',
        props: {
          label: 'Operation Details',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Select All Services Offered',
          placeholder: 'Select All Services Offered',
          withAsterisk: true,
          name: 'homeHealthServicesOffered',
          data: [],
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Any Other Service Offered',
          placeholder: 'Any Other Service Offered',
          name: 'otherHomeHealthSerivces',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Languages Spoken By Staff',
          placeholder: 'Languages Spoken By Staff',
          withAsterisk: true,
          name: 'langSpoken',
          data: [],
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Any Other Language Spoken',
          placeholder: 'Any Other Language Spoken',
          name: 'otherLang',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Area Of Operations',
          placeholder: 'Select Area Of Operations',
          withAsterisk: true,
          name: 'areaOfOperations',
          data: [],
        },
      },
    ],
  },
  DAILY_ASSISTANCE: {
    initialValues: {
      dailyAssistServicesOffered: [],
      otherDailyAssistSerivces: '',
      langSpoken: [],
      otherLang: '',
      areaOfOperations: [],
    },
    validate: {
      servicesOffered: (value) => (value.length > 0 ? null : 'Invalid value'),
      langSpoken: (value) => (value.length > 0 ? null : 'Invalid value'),
      areaOfOperations: (value) => (value.length > 0 ? null : 'Invalid value'),
    },
    render: [
      {
        component: 'TitleDivider',
        props: {
          label: 'Operation Details',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Select All Services Offered',
          placeholder: 'Select All Services Offered',
          withAsterisk: true,
          name: 'dailyAssistServicesOffered',
          data: [],
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Any Other Service Offered',
          placeholder: 'Any Other Service Offered',
          name: 'otherDailyAssistSerivces',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Languages Spoken By Staff',
          placeholder: 'Languages Spoken By Staff',
          withAsterisk: true,
          name: 'langSpoken',
          data: [],
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Any Other Language Spoken',
          placeholder: 'Any Other Language Spoken',
          name: 'otherLang',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Area Of Operations',
          placeholder: 'Select Area Of Operations',
          withAsterisk: true,
          name: 'areaOfOperations',
          data: [],
        },
      },
    ],
  },
  OTHER_SERVICE: {
    initialValues: {
      otherServicesOffered: [],
      otherSerivces: '',
      langSpoken: [],
      otherLang: '',
      areaOfOperations: [],
    },
    validate: {
      otherServicesOffered: (value) =>
        value.length > 0 ? null : 'Invalid value',
      langSpoken: (value) => (value.length > 0 ? null : 'Invalid value'),
      areaOfOperations: (value) => (value.length > 0 ? null : 'Invalid value'),
    },
    render: [
      {
        component: 'TitleDivider',
        props: {
          label: 'Operation Details',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Select All Services Offered',
          placeholder: 'Select All Services Offered',
          withAsterisk: true,
          name: 'otherServicesOffered',
          data: [],
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Any Other Service Offered',
          placeholder: 'Any Other Service Offered',
          name: 'otherSerivces',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Languages Spoken By Staff',
          placeholder: 'Languages Spoken By Staff',
          withAsterisk: true,
          name: 'langSpoken',
          data: [],
        },
      },
      {
        component: 'TextInput',
        props: {
          label: 'Any Other Language Spoken',
          placeholder: 'Any Other Language Spoken',
          name: 'otherLang',
        },
      },
      {
        component: 'MultiSelect',
        props: {
          label: 'Area Of Operations',
          placeholder: 'Select Area Of Operations',
          withAsterisk: true,
          name: 'areaOfOperations',
          data: [],
        },
      },
    ],
  },
};

export default formData;
