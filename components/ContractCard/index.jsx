import { useEffect, useRef } from 'react';
import {
  Text,
  Paper,
  SimpleGrid,
  Badge,
  Divider,
  Group,
  Stack,
  List,
  Card,
} from '@mantine/core';
import dayjs from 'dayjs';
import SignatureCanvas from 'react-signature-canvas';

const getDate = (firebaseTimestamp) => {
  if (!firebaseTimestamp) return '-';

  const date = new Date(
    (firebaseTimestamp.seconds + firebaseTimestamp.nanoseconds * 0.00000001) *
      1000,
  );

  return dayjs(date).format('DD/MM/YYYY');
};

const ContractCard = ({
  status,
  createdOn,
  updatedOn,
  comments,
  rateCards,
  signature,
  startDate,
  endDate,
}) => {
  const signRef = useRef();

  useEffect(() => {
    if (signature) {
      signRef.current.fromDataURL(signature);
    }
  }, [signature]);

  return (
    <Paper shadow="sm" p="md">
      <SimpleGrid spacing="md">
        <Badge size="lg" variant="filled">
          Status: {status}
        </Badge>
      </SimpleGrid>
      <Divider color="dark" my="xs" />
      <Group position="apart">
        <Stack spacing="xs">
          <Text>Created On</Text>
          <Text weight={500}>{getDate(createdOn)}</Text>
        </Stack>
        <Stack spacing="xs">
          <Text>Updated On</Text>
          <Text weight={500}>{getDate(updatedOn)}</Text>
        </Stack>
      </Group>
      <Divider color="dark" my="xs" />
      <Text weight={500}>Comments:</Text>
      <Text>{comments || '-'}</Text>
      <Divider
        size="md"
        my="xs"
        label={
          <Text fz="lg" weight={500}>
            Contract Details
          </Text>
        }
        labelPosition="center"
      />
      <Group position="apart">
        <Stack spacing="xs">
          <Text>Start Date</Text>
          <Text weight={500}>{getDate(startDate)}</Text>
        </Stack>
        <Stack spacing="xs">
          <Text>End Date</Text>
          <Text weight={500}>{getDate(endDate)}</Text>
        </Stack>
      </Group>
      <Divider color="dark" my="xs" />
      {rateCards.map((rateCard, idx) => (
        <Card key={idx}>
          <Text weight={500}>Rate Card for {rateCard.location}</Text>
          <Text>Services:</Text>
          <List spacing="sm">
            {rateCard.services.map((service, idx) => (
              <List.Item key={idx}>
                {service.name} - ₹{service.rate}/-
              </List.Item>
            ))}
          </List>
        </Card>
      ))}
      <Divider color="dark" my="xs" />
      <Text weight={500}>Signature:</Text>
      <SignatureCanvas
        ref={signRef}
        canvasProps={{
          width: 300,
          height: 100,
          className: 'sigCanvas',
        }}
      />
    </Paper>
  );
};

export default ContractCard;
