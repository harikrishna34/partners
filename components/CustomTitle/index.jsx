import { Group, Title } from '@mantine/core';

const CustomTitle = ({ title, rightSection }) => {
  return (
    <Group position="apart">
      <Title order={3} mb={10}>
        {title}
      </Title>
      {rightSection}
    </Group>
  );
};

export default CustomTitle;
