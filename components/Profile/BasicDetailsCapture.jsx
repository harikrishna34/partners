import { SimpleGrid, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';

import { renderComponent } from '../FormRenderer';
import formData from './basicDetailsCaptureData';
import CustomAlert from './CustomAlert';

const BasicDetailsCapture = ({ data, onSubmit }) => {
  const form = useForm({
    initialValues: { ...formData.initialValues, ...data },
    validate: formData.validate,
  });

  const disabledItems = {
    companyName: true,
    businessNature: true,
  };

  const inputData = {
    businessNature: [
      { value: 'PVT LTD', label: 'PVT LTD' },
      { value: 'PARTNERSHIP', label: 'PARTNERSHIP' },
      { value: 'PROPRIETORSHIP', label: 'PROPRIETORSHIP' },
    ],
  };

  return (
    <>
      <CustomAlert
        alerts={[
          {
            id: 1,
            icon: <IconAlertCircle size="1rem" />,
            color: 'orange',
            message:
              'To update the "company name" and "company type", you will have to contact the Anvayaa admin!',
          },
        ]}
      />
      <form onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid>
          {formData.render.map((item) =>
            renderComponent(
              item.component,
              item.props,
              form,
              inputData,
              disabledItems[item.props.name],
            ),
          )}
        </SimpleGrid>
        <Group position="center" mt="xl">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </>
  );
};

export default BasicDetailsCapture;
