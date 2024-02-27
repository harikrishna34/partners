import { Title, Alert } from '@mantine/core';
import { IconSquareCheck } from '@tabler/icons-react';

const ThankYou = () => {
  return (
    <>
      <Title order={4} my={5} ta="center">
        Thank you for your interest in joining our network!
      </Title>
      <Alert
        icon={<IconSquareCheck size="1rem" />}
        title="Thank You!"
        color="orange"
        radius="md"
        variant="outline"
      >
        We will now review your application and get back to you as soon as we
        can. Look out for an email or a call from us!
      </Alert>
    </>
  );
};

export default ThankYou;
