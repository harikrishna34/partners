import { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  Modal,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  Textarea,
  Select,
} from '@mantine/core';
const companyTypes = [
  { value: 'PVT LTD', label: 'PVT LTD' },
  { value: 'PARTNERSHIP', label: 'PARTNERSHIP' },
  { value: 'PROPRIETORSHIP', label: 'PROPRIETORSHIP' },
];

const PartnerApprovalModal = ({
  data,
  close,
  onApprove,
  onReject,
  onSubmit,
}) => {
  const [reason, setReason] = useState('');

  const initialValues = {
    companyName: data.PartnerName,
    businessNature: data.BusinessNature,
    companyWebsite: data.Website,
    email: data.EmailID,
    name: data.ContactName,
    address: data.StreetAddress,
    landmark: data.LandMark,
    city: data.City,
    state: data.State,
    pincode: data.PinCode,
  };
  const form = useForm({
    initialValues,
    validate: {
      companyName: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required company name'
          : null,
      businessNature: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required company type'
          : null,
    },
  });

  return (
    <Modal opened onClose={close} title="Partner Approval and Update" centered>
      <SimpleGrid>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            placeholder="Company name"
            label="Company Name"
            withAsterisk
            name="companyName"
            {...form.getInputProps('companyName')}
          />
          <Select
            label="Company type"
            placeholder="Company type"
            withAsterisk
            data={companyTypes}
            name="businessNature"
            {...form.getInputProps('businessNature')}
          />
          <TextInput
            placeholder="Contact Person"
            label="Contact Person"
            name="name"
            {...form.getInputProps('name')}
          />
          <TextInput
            placeholder="EmailID"
            label="EmailID"
            name="email"
            {...form.getInputProps('email')}
          />
          <TextInput
            placeholder="Website"
            label="Website"
            name="companyWebsite"
            {...form.getInputProps('companyWebsite')}
          />

          <TextInput
            placeholder="Street Address"
            label="Street Address"
            name="address"
            {...form.getInputProps('address')}
          />
          <TextInput
            placeholder="LandMark"
            label="LandMark"
            name="landmark"
            {...form.getInputProps('landmark')}
          />
          <TextInput
            placeholder="City"
            label="City"
            name="city"
            {...form.getInputProps('city')}
          />
          <TextInput
            placeholder="State"
            label="State"
            name="state"
            {...form.getInputProps('state')}
          />
          <TextInput
            placeholder="Pincode"
            label="Pincode"
            name="pincode"
            {...form.getInputProps('pincode')}
          />

          <Group mt={10} position="apart" grow>
            <Button type="submit">Update</Button>
          </Group>
        </form>
        <Textarea
          placeholder="Comment is mandatory for approval/rejection!"
          label="Your comment"
          withAsterisk
          value={reason}
          onChange={(e) => setReason(e.currentTarget.value)}
        />
      </SimpleGrid>

      <Group mt={10} position="apart">
        <Button
          onClick={() => {
            onReject(data, reason);
            close();
          }}
          disabled={reason.trim() == ''}
          color="red"
        >
          Reject
        </Button>
        <Button
          onClick={() => {
            onApprove(data, reason);
            close();
          }}
          disabled={reason.trim() == ''}
          color="green"
        >
          Approve
        </Button>
      </Group>
    </Modal>
  );
};

export default PartnerApprovalModal;
