import { SimpleGrid, Group, Button } from '@mantine/core';

import OnBoardingCard from './OnBoardingCard';

const ServiceSelector = ({ selected, cards, handleClick, onNext }) => {
  return (
    <>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
        {cards.map((card) => (
          <OnBoardingCard
            isSelected={selected == card.id}
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            onClick={() => handleClick(card.id)}
          />
        ))}
      </SimpleGrid>
      <Group position="center" mt="xl">
        <Button disabled>Back</Button>
        <Button disabled={!selected} onClick={onNext}>
          Next step
        </Button>
      </Group>
    </>
  );
};

export default ServiceSelector;
