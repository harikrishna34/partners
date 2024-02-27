import { Card, Text, Badge, Button, Group } from '@mantine/core';

const AdminCard = ({ title, value, onClick }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="center" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
      </Group>

      <Group position="center">
        <Badge color="dark" size="xl" variant="filled">
          {value}
        </Badge>
      </Group>
      <Group mt={10} position="center">
        <Button onClick={onClick} variant="outline" color="blue" radius="md">
          Show More
        </Button>
      </Group>
    </Card>
  );
};

export default AdminCard;
