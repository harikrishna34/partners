import { useContext, useEffect, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  Loader,
  Button,
  Flex,
  Image,
} from '@mantine/core';
import { useRouter } from 'next/router';
import {
  IconDashboard,
  IconUsers,
  IconWriting,
  IconUserCircle,
} from '@tabler/icons-react';
import { NavLink } from '@mantine/core';
import { AuthContext } from '@/context/Auth';
import bannerImage from '@/assets/images/Anvayaa.svg';

const data = [
  { icon: IconDashboard, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: IconUsers, label: 'Partners', to: '/admin/partners' },
  {
    icon: IconWriting,
    label: 'Contracts',
    to: '/admin/contracts?show=Pending',
  },
];

const AdminProtectedLayout = ({ children, noNavs }) => {
  const router = useRouter();
  const { loading, user, setUser } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  const callSignOut = () => {
    window.localStorage.removeItem('isLogin');
    window.localStorage.removeItem('x-fiftyaccess-token');
    window.localStorage.removeItem('partnerID');
    setUser(null);
  };

  useEffect(() => {
    if (!loading && !user && router.isReady) {
      router.replace(`/admin?next=${encodeURIComponent(router.asPath)}`);
    }
  }, [router, user, loading]);

  if (!user) {
    return null;
  }

  const items = data.map((item) => (
    <NavLink
      key={item.label}
      active={router.pathname.toLowerCase().includes(item.label.toLowerCase())}
      label={item.label}
      rightSection={item.rightSection}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        router.push(item.to);
        setOpened(false);
      }}
      variant="filled"
    />
  ));

  if (noNavs) {
    return children;
  }
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          zIndex={200}
          width={{ sm: 200, lg: 300 }}
        >
          {items}
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Image
                src={bannerImage.src}
                alt=""
                height={40}
                fit="contain"
                onClick={() => router.push('/admin/dashboard')}
              />
            </Flex>

            <Button
              onClick={async () => {
                callSignOut();
              }}
              variant="subtle"
              compact
            >
              Sign Out
            </Button>
          </div>
        </Header>
      }
    >
      {loading ? <Loader size="xl" variant="dots" /> : children}
    </AppShell>
  );
};

export default AdminProtectedLayout;
