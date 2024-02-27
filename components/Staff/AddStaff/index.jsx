import {
  SimpleGrid,
  Button,
  Group,
  MultiSelect,
  FileInput,
  Skeleton,
  Image,
  Text,
  FileButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import * as Rest from '@/data/restapi';
import staffFormData from './staffFormData';
import { renderComponent } from '@/components/FormRenderer';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/Auth';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const AddStaff = ({
  initialValues,
  serviceID,
  location,
  services,
  onCancel,
  onAdd,
}) => {
  const form = useForm({
    // initialValues: {
    //   ...staffFormData[serviceID].initialValues,
    //   certifications: [],
    //   docsSubmitted: [],
    // },
    initialValues,
    validate: {
      ...staffFormData[serviceID].validate,
      docsSubmitted: (value) =>
        value.length > 0 ? null : 'At least one verification doc needed!',
    },
  });

  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const [docsSubmittedData, setDocsSubmittedData] = useState([]);
  const [langSpoken, setLangSpoken] = useState([]);
  const [religions, setReligions] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  useEffect(() => {
    setStatus(STATUS_ENUM.LOADING);
    const getLanguages = () => {
      axios
        .get(Rest.getConstants, {
          headers: {
            'x-fiftyaccess-token': user.token,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code == 'S001') {
            const religions = data.data.Religions;
            const lang = data.data.Languages;
            religions.map((religion, index) => {
              let obj = {};
              obj.value = religion.toLowerCase();
              obj.label = religion;
              setReligions((oldArray) => [...oldArray, obj]);
            });
            lang.map((language, index) => {
              let obj = {};
              obj.value = language.toLowerCase();
              obj.label = language;
              setLangSpoken((oldArray) => [...oldArray, obj]);
            });
          }
          setStatus(STATUS_ENUM.SUCCESS);
        })
        .catch((err) => {
          setStatus(STATUS_ENUM.ERROR);
          if (err.response && err.response.data && err.response.data.data) {
            alert(err.response.data.data);
          } else {
            alert(err.message);
          }
        });
    };
    if (user.token) {
      getLanguages();
    }
  }, [user.token, setSelectedPicture, setLangSpoken, setReligions]);

  useEffect(() => {
    if (initialValues && initialValues.ProfileImg)
      setSelectedPicture(initialValues.ProfileImg);
  }, [initialValues]);

  const inputData = {
    gender: [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ],
    homeHealthServicesOffered: services,
    langSpoken: langSpoken,
    religion: religions,
    locations: location,
  };

  const handleFormSubmit = async (values) => {
    const data = {
      ...values,
      //certifications: values.certifications.map((item) => item.value),
      docsSubmitted: values.docsSubmitted.map((item) => ({
        name: item,
        file: docsSubmittedData[item],
      })),
    };
    onAdd(data);
  };

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
  if (status !== STATUS_ENUM.SUCCESS) {
    return null;
  }
  const handlePictureChange = (files) => {
    setSelectedPicture(URL.createObjectURL(files));
    form.values.ProfileImg = files;
  };
  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <SimpleGrid>
        <Group shadow="xl" padding="xl" style={{ marginTop: '1rem' }}>
          {selectedPicture ? (
            <Image
              src={selectedPicture}
              radius="xl"
              alt="Profile"
              width={150}
              height={150}
              value={selectedPicture}
              name="ProfileImg"
              {...form.getInputProps('ProfileImg')}
              style={{ marginTop: '1rem' }}
            />
          ) : (
            <Text align="center" size="md" color="gray">
              No picture selected
            </Text>
          )}
          <FileButton
            onChange={handlePictureChange}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button {...props} variant="subtle" compact>
                Seelct Profile Image
              </Button>
            )}
          </FileButton>
        </Group>

        {staffFormData[serviceID]['render'].map((item) =>
          renderComponent(item.component, item.props, form, inputData, false),
        )}

        <MultiSelect
          label="Documents Submitting"
          name="docsSubmitted"
          {...form.getInputProps('docsSubmitted')}
          data={[
            { value: 'AADHAR', label: 'Aadhar' },
            // { value: 'PAN', label: 'PAN' },
            // { value: 'DL', label: 'Driving License' },
            // { value: 'INSURANCE', label: 'Insurance' },
            // { value: 'PERMIT', label: 'Permit' },
            // { value: 'OTHER', label: 'Other' },
          ]}
          withAsterisk
          placeholder="Select docs to submit"
          searchable
        />
        {form.values.docsSubmitted &&
          form.values.docsSubmitted.map((doc) => (
            <FileInput
              key={doc}
              value={docsSubmittedData[doc] || null}
              onChange={(value) =>
                setDocsSubmittedData({ ...docsSubmittedData, [doc]: value })
              }
              withAsterisk
              required
              label={`Upload ${doc}`}
              placeholder={`Upload ${doc}`}
              accept="image/png,image/jpeg,application/pdf"
            />
          ))}
      </SimpleGrid>
      <Group mt={10} position="apart">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button type="submit" color="green">
          Add
        </Button>
      </Group>
    </form>
  );
};

export default AddStaff;
