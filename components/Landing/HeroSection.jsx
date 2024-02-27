import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import bannerImage from '@/assets/images/Anvayaa.svg';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

const HeroSection = () => {
  const { classes } = useStyles();

  const router = useRouter();

  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Welcome to <span className={classes.highlight}>Anvayaa&apos;s</span>{' '}
            Partner Management System
          </Title>
          <Text color="dimmed" mt="md">
            Crafting a new way to manage your business.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={rem(12)} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Track bussiness</b> - Track sales, customers and growth levers
              directly from your phone
            </List.Item>
            <List.Item>
              <b>Durability</b> - We enable you to get more revenue, new
              customers and boost your brand visibility by providing insights to
              improve your business.
            </List.Item>
            <List.Item>
              <b>24*7 Assistance</b> - Get expert assistance for all your doubts
              with our partner support program
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              radius="xl"
              size="md"
              className={classes.control}
              onClick={() => router.push('/join-us')}
            >
              Join Us
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
              onClick={() => router.push('/sign-in')}
            >
              Sign In
            </Button>
          </Group>
        </div>
        <Image src={bannerImage.src} alt="" className={classes.image} />
      </div>
    </Container>
  );
};

export default HeroSection;
