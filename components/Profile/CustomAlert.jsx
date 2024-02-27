import { Alert, SimpleGrid } from '@mantine/core';

const CustomAlert = ({ alerts }) => {
  if (alerts.length == 0) return null;

  return (
    <SimpleGrid>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          icon={alert.icon}
          color={alert.color}
          radius="xs"
          variant="filled"
          my={4}
        >
          {alert.message}
        </Alert>
      ))}
    </SimpleGrid>
  );
};

export default CustomAlert;
