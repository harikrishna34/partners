import { SimpleGrid, Group, Button, Skeleton } from '@mantine/core';
import { useForm } from '@mantine/form';
import formData from './OperationDetailsData'; // Assuming the formData object is now in a separate file
import { renderComponent } from '../FormRenderer';
import { useContext } from 'react';
import { AuthContext } from '@/context/Auth';

// const STATUS_ENUM = {
//   IDLE: 'IDLE',
//   LOADING: 'LOADING',
//   SUCCESS: 'SUCCESS',
//   ERROR: 'ERROR',
// };
const OperationDetails = ({
  serviceID,
  onPrev,
  homeHealthServicesOffered,
  dailyAssistServicesOffered,
  otherServicesOffered,
  langSpoken,
  areaOfOperations,
  onSubmit,
}) => {
  const form = useForm({
    initialValues: formData[serviceID].initialValues,
    validate: formData[serviceID].validate,
  });

  const { user } = useContext(AuthContext);

  //const [status, setStatus] = useState(STATUS_ENUM.IDLE);

  const inputData = {
    homeHealthServicesOffered: homeHealthServicesOffered,
    dailyAssistServicesOffered: dailyAssistServicesOffered,
    otherServicesOffered: otherServicesOffered,
    langSpoken: langSpoken,
    areaOfOperations: areaOfOperations,
  };

  // here useeffect to grb languages and services
  //save it to a state variable  and pass to renderComponent function

  // if (status == STATUS_ENUM.LOADING) {
  //   return (
  //     <>
  //       <Skeleton height={8} mt={6} width="100%" radius="xl" />
  //       <Skeleton height={8} mt={6} width="100%" radius="xl" />
  //       <Skeleton height={8} mt={6} width="100%" radius="xl" />
  //       <Skeleton height={8} mt={6} width="100%" radius="xl" />
  //     </>
  //   );
  // }
  // if (status !== STATUS_ENUM.SUCCESS) {
  //   return null;
  // }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <SimpleGrid>
        {formData[serviceID].render.map((item) =>
          renderComponent(item.component, item.props, form, inputData),
        )}
      </SimpleGrid>
      <Group position="center" mt="xl">
        <Button onClick={onPrev}>Back</Button>
        <Button type="submit">Finish</Button>
      </Group>
    </form>
  );
};

export default OperationDetails;
