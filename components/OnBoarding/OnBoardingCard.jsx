import { Card, Image, Text, Button, Group, Center } from '@mantine/core';

const OnBoardingCard = ({ isSelected, title, description, icon, onClick }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: isSelected ? '#D3F9D8' : null,
      }}
      shadow={isSelected ? 'lg' : 'sm'}
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Center>{icon}</Center>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {description}
      </Text>

      <Button
        onClick={onClick}
        color={isSelected ? 'dark' : 'default'}
        fullWidth
        mt="md"
        radius="md"
        uppercase
      >
        {isSelected ? 'Unselect' : 'Select'}
      </Button>
    </Card>
  );
};

export default OnBoardingCard;
