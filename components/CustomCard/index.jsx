import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Indicator,
  Stack,
} from '@mantine/core';

const CustomCard = ({ title, value, onClick, isUpcomingFeature }) => {
  console.log('@@@@@@@@@@@@@  ', title, value, onClick, isUpcomingFeature);
  const cardContent = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack position="apart">
        <Group position="center" mt="md" mb="xs">
          <Text weight={500}>{title}</Text>
        </Group>

        <Group position="center">
          <Badge color="dark" size="xl" variant="filled">
            {isUpcomingFeature ? 'N/A' : value}
          </Badge>
        </Group>
        <Group mt={10} position="center">
          <Button
            disabled={isUpcomingFeature}
            onClick={onClick}
            variant="outline"
            radius="md"
          >
            Show More
          </Button>
        </Group>
      </Stack>
    </Card>
  );

  return isUpcomingFeature ? (
    <Indicator position="top-center" label="Coming Soon" size={16}>
      {cardContent}
    </Indicator>
  ) : (
    cardContent
  );
};

export default CustomCard;
