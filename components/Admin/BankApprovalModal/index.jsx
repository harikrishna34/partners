import { useForm } from '@mantine/form';
import { useState } from 'react';
import {
  Modal,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  Textarea,
  Select,
  FileInput,
  rem,
  Text,
  Anchor,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

const bankAccountTypes = [
  { value: 'SAVINGS', label: 'Savings' },
  { value: 'CURRENT', label: 'Current' },
];
const BankApprovalModal = ({ data, close, onApprove, onReject, onSubmit }) => {
  const [reason, setReason] = useState('');
  const initialValues = {
    pan: data.PAN,
    panDoc: '',
    gstin: data.GSTIN,
    gstDoc: '',
    bankName: data.BankName,
    accountNumber: data.AccountNumber,
    confirmAccountNumber: data.AccountNumber,
    accountHolderName: data.AccountHolderName,
    bankAccountType: data.AccountType,
    ifscCode: data.IFSCCode,
    bankBranch: data.Branch,
    bankAddress: data.BankAddress,
    bankCity: data.BankCity,
    bankState: data.BankState,
    bankPinCode: data.BankPinCode,
    businessRegDoc: '',
    cancelledCheck: '',
  };
  const form = useForm({
    initialValues,
    validate: {
      pan: (value) =>
        /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/.test(value)
          ? null
          : 'Pan is required',
      panDoc: (value) =>
        value == undefined || value == null ? 'Required Pan card doc' : null,

      // gstin: (value) =>
      //   (value.length > 0  && /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value))
      //     ? null
      //     : 'GSTIN is required',
      //gstDoc: (value) => (value != null ? null : 'GST copy document is required'),
      bankName: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required Bank name'
          : null,
      accountNumber: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required Account number'
          : null,
      confirmAccountNumber: (value, values) =>
        value !== values.accountNumber ? 'Account Number did not match' : null,
      accountHolderName: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required account holder name'
          : null,
      bankAccountType: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required bank account type'
          : null,
      ifscCode: (value) =>
        /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value) ? null : 'IFSC Code is required',
      bankBranch: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required bank branch'
          : null,
      bankAddress: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required bank address'
          : null,
      bankCity: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required bank city'
          : null,
      bankState: (value) =>
        value == undefined || value.trim().length < 1
          ? 'Required bank state'
          : null,
      bankPinCode: (value) =>
        /^[1-9][0-9]{5}$/.test(value) ? null : 'Bank Pincode is required',
      businessRegDoc: (value) =>
        value == undefined || value == null
          ? 'Required business reg doc'
          : null,
      cancelledCheck: (value) =>
        value == undefined || value == null
          ? 'Required cancelled check or passbook'
          : null,
    },
  });

  return (
    <Modal opened onClose={close} title="Bank Approval and Update" centered>
      <SimpleGrid>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            placeholder="PAN number"
            label="PAN number"
            withAsterisk
            name="pan"
            {...form.getInputProps('pan')}
          />

          <FileInput
            mt={10}
            label="PAN Card Document"
            placeholder="Upload PAN Card Document"
            withAsterisk
            icon={<IconUpload size={rem(14)} />}
            name="panDoc"
            {...form.getInputProps('panDoc')}
          />

          <Anchor
            mt={10}
            fw={500}
            c="blue"
            onClick={() => {
              window.open(data.PanCardDocument, '_blank');
            }}
          >
            View PAN card Document
          </Anchor>

          <TextInput
            label="GSTIN"
            placeholder="GSTIN"
            name="gstin"
            {...form.getInputProps('gstin')}
          />
          <FileInput
            mt={10}
            label="GSTIN Copy Document'"
            placeholder="Upload GSTIN Copy Document"
            icon={<IconUpload size={rem(14)} />}
            name="gstDoc"
            {...form.getInputProps('gstDoc')}
          />

          <Anchor
            mt={10}
            fw={500}
            c="blue"
            onClick={() => {
              window.open(data.GSTDocument, '_blank');
            }}
          >
            View GSTIN copy
          </Anchor>
          <TextInput
            placeholder="Bank name"
            label="Bank name"
            withAsterisk
            name="bankName"
            {...form.getInputProps('bankName')}
          />

          <TextInput
            placeholder="Account number"
            label="Account number"
            withAsterisk
            type="password"
            name="accountNumber"
            {...form.getInputProps('accountNumber')}
          />

          <TextInput
            placeholder="Confirm Account number"
            label=" Confirm Account number"
            withAsterisk
            type="Number"
            name="confirmAccountNumber"
            {...form.getInputProps('confirmAccountNumber')}
          />

          <TextInput
            placeholder="Account holder name"
            label="Account holder name"
            withAsterisk
            name="accountHolderName"
            {...form.getInputProps('accountHolderName')}
          />
          <Select
            placeholder="Bank account type"
            label="Bank account type"
            withAsterisk
            data={bankAccountTypes}
            name="bankAccountType"
            {...form.getInputProps('bankAccountType')}
          />

          <TextInput
            placeholder="IFSC Code"
            label="IFSC Code"
            withAsterisk
            name="ifscCode"
            {...form.getInputProps('ifscCode')}
          />

          <TextInput
            placeholder="Bank branch"
            label="Bank branch"
            withAsterisk
            name="bankBranch"
            {...form.getInputProps('bankBranch')}
          />

          <TextInput
            placeholder="Bank address"
            label="Bank address"
            withAsterisk
            name="bankAddress"
            {...form.getInputProps('bankAddress')}
          />

          <TextInput
            placeholder="Bank city"
            label="Bank city"
            withAsterisk
            name="bankCity"
            {...form.getInputProps('bankCity')}
          />

          <TextInput
            placeholder="Bank state"
            label="Bank state"
            withAsterisk
            name="bankState"
            {...form.getInputProps('bankState')}
          />

          <TextInput
            placeholder="Bank PinCode"
            label="Bank PinCode"
            withAsterisk
            name="bankPinCode"
            {...form.getInputProps('bankPinCode')}
          />

          <FileInput
            label="Business Registration Document"
            placeholder="Upload Business Registration Document"
            withAsterisk
            icon={<IconUpload size={rem(14)} />}
            name="businessRegDoc"
            {...form.getInputProps('businessRegDoc')}
          />

          <Anchor
            mt={10}
            fw={500}
            c="blue"
            onClick={() => {
              window.open(data.BusinessRegistrationDocument, '_blank');
            }}
          >
            View Business Registration Document
          </Anchor>

          <FileInput
            mt={10}
            label="Cancelled check / pass book"
            placeholder="Upload cancelled check / pass book"
            withAsterisk
            icon={<IconUpload size={rem(14)} />}
            name="cancelledCheck"
            {...form.getInputProps('cancelledCheck')}
          />
          <Anchor
            mt={10}
            fw={500}
            c="blue"
            onClick={() => {
              window.open(data.CancelledCheck, '_blank');
            }}
          >
            View cancelled check / pass book
          </Anchor>
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
            onReject(data.PartnerID, reason);
            close();
          }}
          disabled={reason.trim() == ''}
          color="red"
        >
          Reject
        </Button>
        <Button
          onClick={() => {
            onApprove(data.PartnerID, reason);
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

export default BankApprovalModal;
