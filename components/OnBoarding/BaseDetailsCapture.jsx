import { SimpleGrid, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import formData from './BaseDetailsCaptureData'; // Assuming the formData object is now in a separate file
import { renderComponent } from '../FormRenderer';

const BaseDetailsCapture = ({ onPrev, onSubmit }) => {
  const form = useForm({
    initialValues: formData.initialValues,
    validate: formData.validate,
  });

  const inputData = {
    companyType: [
      { value: 'PVT LTD', label: 'PVT LTD' },
      { value: 'PARTNERSHIP', label: 'Partnership' },
      { value: 'PROPRIETORSHIP', label: 'Proprietorship' },
    ],
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <SimpleGrid>
        {formData.render.map((item) =>
          renderComponent(item.component, item.props, form, inputData),
        )}
      </SimpleGrid>
      <Group position="center" mt="xl">
        <Button onClick={onPrev}>Back</Button>
        <Button type="submit">Next step</Button>
      </Group>
    </form>
  );
};

export default BaseDetailsCapture;
