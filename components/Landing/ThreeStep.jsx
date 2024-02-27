import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  Container,
  rem,
} from '@mantine/core';
import { IconHome, IconCertificate, IconCheck } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  feature: {
    position: 'relative',
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  overlay: {
    position: 'absolute',
    height: rem(100),
    width: rem(160),
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    zIndex: 1,
  },

  content: {
    position: 'relative',
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
      .color,
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const Step = ({ icon: Icon, title, description, className, ...others }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={rem(38)} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
};

const mockdata = [
  {
    icon: IconHome,
    title: 'Register',
    description: 'Start with providing your bussiness details',
  },
  {
    icon: IconCertificate,
    title: 'Set Up',
    description: 'Then upload all the required documents',
  },
  {
    icon: IconCheck,
    title: 'On board',
    description:
      'Now team will review them and get back to you with any further instructions or updates',
  },
];

const ThreeStep = () => {
  const { classes } = useStyles();

  const items = mockdata.map((item) => <Step {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <Title order={2} className={classes.title} ta="center" m="sm">
        Our 3 Step Approval Process
      </Title>
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default ThreeStep;
