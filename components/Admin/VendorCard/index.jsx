import {
  Card,
  Paper,
  Divider,
  Text,
  Group,
  Stack,
  SimpleGrid,
  Badge,
  List,
} from '@mantine/core';

const VendorCard = ({
  baseDetails,
  bankingDetails,
  operationDetails,
  serviceOffered,
}) => {
  const address = `${baseDetails.addressLine1}, ${baseDetails.addressLine2}, ${baseDetails.city}, ${baseDetails.state}, ${baseDetails.pincode}`;

  return (
    <Paper shadow="sm" p="md">
      <Divider
        size="md"
        my="xs"
        label={
          <Text fz="lg" weight={500}>
            Vendor Details
          </Text>
        }
        labelPosition="center"
      />
      <SimpleGrid cols={2}>
        <Stack>
          <Text>Name: </Text>
          <Text weight={500}>{baseDetails.companyName}</Text>
        </Stack>
        <Stack>
          <Text>Type: </Text>
          <Text weight={500}>{baseDetails.companyType}</Text>
        </Stack>
        <Stack>
          <Text>Website: </Text>
          <Text weight={500}>{baseDetails.companyWebsite}</Text>
        </Stack>
        <Stack>
          <Text>Address: </Text>
          <Text weight={500}>{address}</Text>
        </Stack>
      </SimpleGrid>
      <Divider
        size="md"
        my="xs"
        label={
          <Text fz="sm" weight={500}>
            Contact Person Details
          </Text>
        }
        labelPosition="center"
      />
      <SimpleGrid cols={2}>
        <Stack>
          <Text>Name: </Text>
          <Text weight={500}>
            {baseDetails.title}. {baseDetails.firstName} {baseDetails.lastName}
          </Text>
        </Stack>
        <Stack>
          <Text>Email: </Text>
          <Text weight={500}>{baseDetails.email}</Text>
        </Stack>
        <Stack>
          <Text>Phone: </Text>
          <Text weight={500}>{baseDetails.phoneNumber}</Text>
        </Stack>
      </SimpleGrid>
    </Paper>
  );
};

export default VendorCard;
