import { SimpleGrid, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';

import { renderComponent } from '../FormRenderer';
import formData from './businessDetailsCaptureData';
import CustomAlert from './CustomAlert';

let isItemViewOnly = false;
let date = null;
const BusinessDetailsCapture = ({ data, onSubmit }) => {
  if (data.businessStartDate != null) {
    date = new Date(data.businessStartDate * 1000);
  }
  const form = useForm({
    initialValues: {
      ...formData.initialValues,
      ...data,
      businessStartDate: date,
      businessRegDoc: data.businessRegDoc
        ? new File([], 'Business Registration Document')
        : null,
      panCardDocument: data.panCardDocument
        ? new File([], 'Pan Card Document')
        : null,
      gstDocument: data.gstDocument ? new File([], 'GST Document') : null,
      cancelledCheck: data.cancelledCheck
        ? new File([], 'Cancelled Check')
        : null,
    },
    validate: formData.validate,
  });

  const inputData = {
    bankAccountType: [
      { value: 'SAVINGS', label: 'Savings' },
      { value: 'CURRENT', label: 'Current' },
    ],
  };
  if (data.BankDetailsStatus != 'Pending') {
    isItemViewOnly = true;
  }
  return (
    <>
      {isItemViewOnly && (
        <CustomAlert
          alerts={[
            {
              id: 1,
              icon: <IconAlertCircle size="1rem" />,
              color: 'orange',
              message:
                'To update these business details you will have to contact the Anvayaa admin!',
            },
          ]}
        />
      )}
      <form onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid>
          {formData.render.map((item) =>
            renderComponent(
              item.component,
              item.props,
              form,
              inputData,
              isItemViewOnly,
            ),
          )}
        </SimpleGrid>
        <Group position="center" mt="xl">
          <Button disabled={isItemViewOnly} type="submit">
            {isItemViewOnly
              ? 'Contact Anvaaya Admin to update details!'
              : 'Add Details'}
          </Button>
        </Group>
      </form>
    </>
  );
};

export default BusinessDetailsCapture;
