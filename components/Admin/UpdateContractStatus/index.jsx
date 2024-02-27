import { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  Modal,
  SimpleGrid,
  Button,
  Group,
  Textarea,
  FileInput,
  rem,
  Select,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
const UpdateContractStatus = ({ data, close, onSubmit }) => {
  console.log(data, '...........////.........');
  const [reason, setReason] = useState('');
  let statusArray = [];
  //drop down values based on contract status
  if (data.ContractStatus == 'Approved') {
    statusArray = [
      { value: 'Reject', label: 'Reject' },
      { value: 'Terminate', label: 'Terminate' },
    ];
  } else {
    statusArray = [
      { value: 'Approve', label: 'Approve' },
      { value: 'Reject', label: 'Reject' },
    ];
  }
  const initialValues = {
    businessRegDoc: '',
    reason: '',
    status: '',
  };
  const form = useForm({
    initialValues,
    validate: {
      businessRegDoc: (value) =>
        value.status == 'Approve' &&
        (value == undefined || value == null || value == '')
          ? 'Required agreement doc'
          : null,
      reason: (value) =>
        value == undefined || value == null || value == ''
          ? 'Required comment'
          : null,
      status: (value) =>
        value == undefined || value == null || value == ''
          ? 'Required status'
          : null,
    },
  });

  return (
    <Modal opened onClose={close} title="Contract Approval and Update" centered>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid>
          <FileInput
            placeholder="Select file"
            label="Browse file"
            description="Select signed doc here"
            variant="filled"
            radius="md"
            size="md"
            accept="pdf"
            name="businessRegDoc"
            {...form.getInputProps('businessRegDoc')}
            icon={<IconUpload size={rem(14)} />}
          />
          <Textarea
            placeholder="Comment is mandatory for approval/rejection/terminate!"
            label="Your comment"
            withAsterisk
            value={reason}
            onChange={(e) => setReason(e.currentTarget.value)}
            name="reason"
            {...form.getInputProps('reason')}
          />
          <Select
            label="Select status"
            placeholder="Select status"
            data={statusArray}
            name="status"
            {...form.getInputProps('status')}
          />
        </SimpleGrid>
        <Group mt={30} position="center">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default UpdateContractStatus;
