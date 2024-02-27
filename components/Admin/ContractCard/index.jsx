import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
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
  Textarea,
  Button,
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
  onApprove,
  onReject,
  vendorId,
  contractId,
}) => {
  const router = useRouter();
  const [comment, setComment] = useState(comments || '');

  const signRef = useRef();

  useEffect(() => {
    if (signature) {
      signRef.current.fromDataURL(signature);
      signRef.current.off();
    }
  }, [signature]);

  return (
    <Paper shadow="sm" p="md">
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

      <Group my={10} position="apart" grow>
        <SignatureCanvas
          ref={signRef}
          canvasProps={{
            width: 300,
            height: 50,
            className: 'sigCanvas',
          }}
        />
        <Button
          onClick={() =>
            router.push(`/admin/agreements/${vendorId}/${contractId}`)
          }
          fullWidth
          color="blue"
          size="xs"
          disabled={status == 'PENDING'}
        >
          View Agreement
        </Button>
      </Group>
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
      <Textarea
        description="A comment is necessary to reject/approve a contract!"
        placeholder="Comments"
        label="Comments"
        withAsterisk
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
      />
      <Group my={10} position="apart">
        <Button
          onClick={() => onReject(comment)}
          disabled={comment.trim() == ''}
          variant="danger"
        >
          Reject
        </Button>
        <Button
          onClick={() => onApprove(comment)}
          disabled={comment.trim() == ''}
          variant="success"
        >
          Approve
        </Button>
      </Group>
    </Paper>
  );
};

export default ContractCard;
