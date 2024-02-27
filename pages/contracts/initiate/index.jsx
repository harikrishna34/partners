import { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import * as Rest from '@/data/restapi';
import {
  TextInput,
  Button,
  Group,
  ActionIcon,
  Skeleton,
  Box,
  Accordion,
  Stack,
  Card,
  Text,
  Grid,
  Select,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import SignatureCanvas from 'react-signature-canvas';

import ProtectedLayout from '@/layouts/ProtectedLayout';
import CustomTitle from '@/components/CustomTitle';
import { initialize } from '@/firebase';
import { AuthContext } from '@/context/Auth';

function AccordionControl({ onDelete, showActionButton, ...props }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Accordion.Control {...props} />
      {showActionButton && (
        <ActionIcon onClick={onDelete} size="lg">
          <IconTrash size="1.5rem" color="red" />
        </ActionIcon>
      )}
    </Box>
  );
}

let locationId = 1;
let serviceId = 1;

const initialValues = {
  startDate: null,
  endDate: null,
  rateCards: [
    {
      id: locationId,
      location: '',
      services: [
        {
          id: serviceId,
          name: '',
          rate: '',
        },
      ],
    },
  ],
};

const Initiate = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const signRef = useRef();
  const [locations, setLocations] = useState([]);
  const [searchValue, onSearchChange] = useState('');

  useEffect(() => {
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
          alert(err.message);
        });
    };
    fetchLocationsData();
  }, []);

  const form = useForm({
    initialValues,
    validate: {
      startDate: (value) =>
        value == null ? 'Required Contract Start Date' : null,
      endDate: (value) => (value == null ? 'Required Contract End Date' : null),
      rateCards: (value) =>
        value.length == 0 ? 'Required At Least One Location' : null,
    },
  });

  const handleAddLocation = () => {
    form.insertListItem('rateCards', {
      id: ++locationId,
      location: '',
      services: [
        {
          id: ++serviceId,
          name: '',
          rate: '',
        },
      ],
    });
  };

  const handleAddService = (idx) => {
    form.insertListItem(`rateCards.${idx}.services`, {
      id: ++serviceId,
      name: '',
      rate: '',
    });
  };

  const handleDeleteService = (idx, serIdx) => {
    form.removeListItem(`rateCards.${idx}.services`, serIdx);
  };

  const handleDeleteLocation = (idx) => {
    form.removeListItem(`rateCards`, idx);
  };

  const saveRateCardData = async (values) => {
    try {
      if (signRef.current.isEmpty()) {
        alert('Please sign the contract');
        return;
      }
    } catch (e) {}
  };

  const renderLocations = (idx, form) => {
    return (
      <Select
        label="Select Location"
        required
        searchable
        onSearchChange={onSearchChange}
        searchValue={searchValue}
        nothingFound="No options"
        placeholder="Select Location"
        data={locations}
        name={`rateCards.${idx}.location`}
        {...form.getInputProps(`rateCards.${idx}.location`)}
      />
    );
  };

  return (
    <section>
      <CustomTitle title="Initiate Contract" />
      <form onSubmit={form.onSubmit(saveRateCardData)}>
        <Group position="apart" grow>
          <DatePickerInput
            valueFormat="DD-MM-YYYY"
            label="Start date"
            placeholder="Contract start date"
            withAsterisk
            {...form.getInputProps('startDate')}
          />
          <DatePickerInput
            valueFormat="DD-MM-YYYY"
            label="End date"
            placeholder="Contract end date"
            withAsterisk
            {...form.getInputProps('endDate')}
          />
        </Group>

        <Accordion
          mt={10}
          variant="separated"
          chevronPosition="left"
          defaultValue="item-0"
        >
          {form.values.rateCards.map((value, idx) => (
            <Accordion.Item key={value.id} value={`item-${idx}`}>
              <AccordionControl
                showActionButton={form.values.rateCards.length != 1}
                onDelete={() => handleDeleteLocation(idx)}
              >
                Location {idx + 1}: {value.location}
              </AccordionControl>
              <Accordion.Panel>
                {renderLocations(idx, form)}
                {/* <TextInput
                  label="Enter Location Name"
                  name={`rateCards.${idx}.location`}
                  {...form.getInputProps(`rateCards.${idx}.location`)}
                  placeholder="Enter Location Name"
                  required
                /> */}
                {value.services.map((serVal, serIdx) => (
                  <Grid
                    justify="center"
                    align="flex-end"
                    grow
                    key={`${value.id}-${serVal.id}`}
                    mt="10px"
                  >
                    <Grid.Col span={4}>
                      <TextInput
                        label="Service Name"
                        placeholder="Enter Service Name"
                        required
                        name={`rateCards.${idx}.services.${serIdx}.name`}
                        {...form.getInputProps(
                          `rateCards.${idx}.services.${serIdx}.name`,
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Select
                        label="Tariff type"
                        placeholder="Select tariff type"
                        required
                        name={`rateCards.${idx}.services.${serIdx}.tariffType`}
                        data={[
                          { value: '12 hours', label: '12 hours' },
                          { value: 'Daily', label: 'Daily' },
                          { value: 'Monthly', label: 'Monthly' },
                        ]}
                        {...form.getInputProps(
                          `rateCards.${idx}.services.${serIdx}.tariffType`,
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <TextInput
                        label="Rate in ₹ (INR)"
                        placeholder="Enter Rate in ₹ (INR)"
                        type="number"
                        required
                        name={`rateCards.${idx}.services.${serIdx}.rate`}
                        {...form.getInputProps(
                          `rateCards.${idx}.services.${serIdx}.rate`,
                        )}
                      />
                    </Grid.Col>
                    {value.services.length != 1 && (
                      <Grid.Col span={1}>
                        <ActionIcon
                          onClick={() => handleDeleteService(idx, serIdx)}
                          size="lg"
                        >
                          <IconTrash size="1.5rem" color="red" />
                        </ActionIcon>
                      </Grid.Col>
                    )}
                  </Grid>
                ))}
                <Button
                  mt="sm"
                  variant="light"
                  onClick={() => handleAddService(idx)}
                >
                  Add One More Service
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <Stack align="center">
          <Button mt="sm" variant="outline" onClick={handleAddLocation}>
            Add One More Location
          </Button>
          <Group position="apart">
            <Text weight={500}>Signature:</Text>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <SignatureCanvas
                  ref={signRef}
                  canvasProps={{
                    width: 300,
                    height: 100,
                    className: 'sigCanvas',
                  }}
                />
              </Card.Section>
              <Button
                onClick={() => signRef.current.clear()}
                variant="light"
                radius="md"
              >
                Clear
              </Button>
            </Card>
          </Group>
          <Button type="submit" mt="sm">
            Submit
          </Button>
        </Stack>
      </form>
    </section>
  );
};

Initiate.getLayout = function getLayout(page) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
export default Initiate;
